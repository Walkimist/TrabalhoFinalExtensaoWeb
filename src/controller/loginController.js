const Usuario = require('../model/usuario');

async function logar(req, res) {
    const usuario = await Usuario.findOne({
        where: {
            email: req.body.email,
            senha: req.body.senha
        }
    });
    if (usuario !== null) {
        req.session.logado = true;
        req.session.usuario = usuario;
        res.redirect('/home');
    }
    else {
        let erro_login = true;
        res.render('index.html', { erro_login });
    }
}

function verificarLogin(req, res, next) {
    if (req.session.logado) {
        next();
    }
    else {
        res.redirect('/');
    }
}

function sair(req, res) {
    req.session.destroy();
    res.redirect('/');
}

module.exports = {
    logar,
    verificarLogin,
    sair
}