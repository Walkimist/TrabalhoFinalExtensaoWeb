const Usuario = require('../model/usuario');

function cadastrarUsuario(req, res) {
    let usuario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
    }

    Usuario.create(usuario).then(() => {
        let sucesso = true;
        res.render("index.html", { sucesso });
    }).catch((err) => {
        console.log(err);
        let erro = true;
        res.render("index.html", { erro });
    });
}

function atualizarDados(req, res) {
    Usuario.update({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
    }, {
        where: {
            id: req.session.usuario.id
        }
    }).then(() => {
        let sucesso = true;
        res.render("atualizar_dados.html", { sucesso });
    }).catch((err) => {
        console.log(err);
        let erro = true;
        res.render("atualizar_dados.html", { erro });
    });
}

function configUserView(req, res) {
    res.render('atualizar_dados.html');
}

module.exports = {
    cadastrarUsuario,
    atualizarDados,
    configUserView
}