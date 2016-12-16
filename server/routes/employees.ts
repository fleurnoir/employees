import { Router, Response, Request } from 'express';
import { IEmployee, Employee } from '../../src/app/models/employee';
import { INamedEntity, Company, Department, Position } from '../../src/app/models/named-entity';
import { Document, Schema, model, Model } from 'mongoose';

const employeeRouter: Router = Router();

interface IEmployeeModel extends IEmployee, Document {
  _id: number;
}

let employeeSchema = new Schema({
  _id: Number,
  firstName: String,
  lastName: String,
  companyId: Number,
  positionId: Number,
  departmentId: Number,
  chiefId: Number,
  email: String,
  mobile: String,
  office: String
});

let EmployeeModel = model<IEmployeeModel>('employees', employeeSchema);

interface INamedEntityModel extends INamedEntity, Document {
  _id: number;
}

let namedSchema = new Schema({
  _id: Number,
  name: String
});

let CompanyModel = model<INamedEntityModel>('companies', namedSchema);
let DepartmentModel = model<INamedEntityModel>('departments', namedSchema);
let PositionModel = model<INamedEntityModel>('positions', namedSchema);

employeeRouter.get('/search/:input', (request, response) => {
  EmployeeModel.find({
    $where: `(this.firstName + " " + this.lastName).toLowerCase().indexOf(${JSON.stringify(request.params.input)}) >= 0`
  }).exec((err, res) => {
    if (err)
      response.json({ error: err });
    else
      response.json(res.map(item => {
        item.id = item._id;
        return new Employee(item);
      }));
  });
});

interface IPhoto extends Document {
  _id: number;
  photo: Buffer;
}

let photoModel = model<IPhoto>('employeePhoto', new Schema({
  _id: Number,
  photo: Buffer
}), 'employees');

employeeRouter.get('/photo/:id', (request,response)=>{
  let id = +request.params['id'];
  photoModel.findOne({_id:id}).then(photo=>{
    response.type('image/jpeg');
    response.end(photo.photo);
  });
});

function makeGetCore(router: Router, path: string, getResult: (id: number) => Promise<any>) {
  router.get(path, (request: Request, response: Response) => {
    var id = +request.params['id'];
    if (!id)
      response.json({ error: `No id given` });
    else {
      getResult(id).then(res => response.json(res)).catch(err => response.json({ error: err }));
    }
  });
}

function makeGet<TModel extends Document>(router: Router, path: string, model: Model<TModel>, constructor: (item: TModel) => any) {
  makeGetCore(router, path, id => model.findOne({ _id: id }).exec().then(
    item => {
      (<any>item).id = +item._id
      return constructor(item);
    }));
}

makeGet(employeeRouter, '/employee/:id', EmployeeModel, item => new Employee(item));
makeGet(employeeRouter, '/department/:id', DepartmentModel, item => new Department(item));
makeGet(employeeRouter, '/company/:id', CompanyModel, item => new Company(item));
makeGet(employeeRouter, '/position/:id', PositionModel, item => new Position(item));
makeGetCore(employeeRouter, '/subordinates/:id',
  id => EmployeeModel
    .find({ chiefId: id })
    .exec()
    .then(result => result.map(item => {
      item.id = +item._id;
      return new Employee(item);
    })));
makeGetCore(employeeRouter, '/subcount/:id', id => EmployeeModel.count({ chiefId: id }).exec());

export { employeeRouter }
