import {Router} from "express";
import UserController from '../controllers/UserController';

let router = Router();
//USER
router.get('/User/:id', (req, res) => {
    UserController.searchOne(req.params.id).then((resp) => {
        if(resp.recordsets.length > 0)
            res.send(resp.recordsets[0]);
        else
            res.send(resp);
    });
});

router.post('/User/searchAll', (req, res) => {
    UserController.searchAll(req.body.page, req.body.limit).then((resp) => {
        if(resp.recordsets.length > 0)
            res.send(resp.recordsets[0]);
        else
            res.send(resp);
    });
});

router.post('/User/searchAllWithFilter', (req, res) => {
    UserController.searchAllWithFilter(req.body.filter, req.body.type).then((resp) => {
        if(resp.recordsets.length > 0)
            res.send(resp.recordsets[0]);
        else
            res.send(resp);
    });
});

router.post('/User/create', (req, res) => {
    UserController.createUser(req.body).then((resp) => {
        if(resp.recordsets.length > 0)
            res.send(resp.recordsets[0]);
        else
            res.send(resp);
    });
});

router.put('/User/update', (req, res) => {
    UserController.updateUser(req.body).then((resp) => {
        res.send(resp);
    });
});

router.post('/User/delete', (req, res) => {
    UserController.deleteUser(req.body.id_usuario).then((resp) => {
        if(resp.recordsets.length > 0)
            res.send(resp.recordsets[0]);
        else
            res.send(resp);
    })
});

export {router};