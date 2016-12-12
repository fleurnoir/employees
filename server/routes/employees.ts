import { Router, Response, Request } from 'express';
import { EMPLOYEES, COMPANIES, DEPARTMENTS, POSITIONS } from '../../src/app/mock-data';

const employeeRouter: Router = Router();

function makeGet(router: Router, path: string, entityName: string, entities:any[]) {
  makeGetCore(router, path, id=>entities.find(e => e.id === id) || { error: `${entityName} with id = ${id} not found` });
}

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
