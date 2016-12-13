import { Router, Response, Request } from 'express';
import { EMPLOYEES, COMPANIES, DEPARTMENTS, POSITIONS } from '../../src/app/mock-data';
import { Document, Schema, model } from 'mongoose';

const employeeRouter: Router = Router();

function makeGet(router: Router, path: string, entityName: string, entities:any[]) {
  makeGetCore(router, path, id=>entities.find(e => e.id === id) || { error: `${entityName} with id = ${id} not found` });
}

interface NamedEntity {
  id: number;
  name: string;
}

interface ICountry extends NamedEntity, Document {}
var namedSchema = new Schema({id: Number, name: String});
var Country = model<ICountry>('countries', namedSchema);

// function testMongo(id: number) {
//   Country.findOne({ id: id }).exec((error, result)=>{console.log()});
// }

employeeRouter.get('/test/:id', (request, response)=>{
  Country.findOne({ id: +request.params.id }).exec((error,country)=>{
    if(error)
      response.json({ info: 'Error occured', error: error });
    else if(!country)
      response.json({ info: 'Error occured', error: `No country with id = ${request.params.id}`});
    else
      response.json({ info: 'Country found', data: country });
  });
});

function makeGetCore(router: Router, path: string, getResult: (id:number)=>any) {
  router.get(path, (request: Request, response: Response) => {
    var id = +request.params['id'];
    if(!id)
      response.json({ error: `No id given` });
    else {
      response.json(getResult(id));
    }
  });
}

makeGet(employeeRouter, '/employee/:id', 'Employee', EMPLOYEES);
makeGet(employeeRouter, '/department/:id', 'Department', DEPARTMENTS);
makeGet(employeeRouter, '/company/:id', 'Company', COMPANIES);
makeGet(employeeRouter, '/position/:id', 'Position', POSITIONS);
makeGetCore(employeeRouter, '/subordinates/:id', id=>EMPLOYEES.filter(e=>e.chiefId===id));

export { employeeRouter }
