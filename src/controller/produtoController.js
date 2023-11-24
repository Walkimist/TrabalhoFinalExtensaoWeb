const Produto = require('../model/produto');
const Transacao = require('../model/transacao');

function indexView(req, res) {
    res.render('index.html');
}

function homeView(req, res) {
    Produto.findAll({
        where: {
            id_usuario: req.session.usuario.id,
            indicador_ativo: 1
        }
    }).then((produtos) => {
        Transacao.findAll({
            where: {
                id_usuario: req.session.usuario.id,
                indicador_ativo: 1
            }
        }).then((transacoes) => {
            res.render('home.html', { produtos, transacoes });
        })
    }).catch((erro_recupera_produtos) => {
        res.render('home.html', { erro_recupera_produtos });
    });
}

function cadastrarProduto(req, res) {
    let produto = {
        nome: req.body.nome,
        id_usuario: req.session.usuario.id,
        descricao: req.body.descricao,
        quantidade: req.body.quantidade,
        indicador_ativo: 1,
        preco: req.body.preco
    }

    Produto.create(produto).then(() => {
        res.redirect('/home');
    }).catch((err) => {
        console.log(err);
        let erro_cadastrar_produto = true;
        res.render("home.html", { erro_cadastrar_produto });
    });
}

function excluirProduto(req, res) {
    Produto.destroy({
        where: {
            id: req.body.id,
        },
    }).then(() => {
        Transacao.destroy({
            where: {
                id_produto: req.body.id,
            },
        })
        res.redirect('/home');
    }).catch((err) => {
        console.log(err);
        let erro_remover_produto = true;
        res.render("home.html", { erro_remover_produto });
    });
}

function configProductView(req, res) {
    Produto.findOne({
        where: {
            id: req.body.id
        }
    }).then((produto) => {
        res.render('atualizar_produto.html', { produto });
    }).catch((err) => {
        console.log(err);
        res.redirect("/home");
    });
}

function atualizarProduto(req, res) {
    Produto.update({
        nome: req.body.nome,
        descricao: req.body.descricao,
        quantidade: req.body.quantidade,
        preco: req.body.preco
    }, {
        where: {
            id: req.body.id
        }
    }).then((produto) => {
        Transacao.findAll({
            where: {
                id_produto: req.body.id
            }
        }).then((transacoes) => {
            if (transacoes === null) {
                res.redirect("/home");
            } else {
                let precoTotal = +transacoes.quantidade * +produto.preco
                Transacao.update({
                    total: precoTotal
                }, {
                    where: {
                        id_produto: req.body.id
                    }
                })
            }
        })
        res.redirect("/home");
    });
}

function cadastrarTransacao(req, res) {
    Produto.findOne({
        where: {
            id: req.body.id_produto
        }
    }).then((produto) => {
        if (produto === null || produto.quantidade <= 0) {
            res.redirect('/home');
        } else {
            let volumeTransacao = null;
            if (req.body.quantidade_produto > produto.quantidade) {
                volumeTransacao = produto.quantidade;
            } else {
                volumeTransacao = req.body.quantidade_produto;
            }
            if (volumeTransacao < 1) volumeTransacao = 1;
            produto.quantidade -= volumeTransacao;
            let precoTotal = produto.preco * volumeTransacao;
            let transacao = {
                id_usuario: req.session.usuario.id,
                id_produto: req.body.id_produto,
                descricao: req.body.descricao,
                quantidade: volumeTransacao,
                total: precoTotal,
                indicador_ativo: 1
            }
            Produto.update({
                quantidade: produto.quantidade
            }, {
                where: {
                    id: produto.id
                }
            });
            Transacao.create(transacao).then(() => {
                res.redirect('/home');
            });
        }
    });
}

function excluirTransacao(req, res) {
    Transacao.destroy({
        where: {
            id: req.body.id,
        },
    }).then(() => {
        Produto.findOne({
            where: {
                id: req.body.id_produto
            }
        }).then((produto) => {
            let novaQuantidade = +produto.quantidade + +req.body.quantidade;
            Produto.update({
                quantidade: novaQuantidade
            }, {
                where: {
                    id: produto.id
                }
            });
        });
        res.redirect('/home');
    }).catch((err) => {
        console.log(err);
        res.redirect('/home');
    });
}

function configTransactionView(req, res) {
    Transacao.findOne({
        where: {
            id: req.body.id
        }
    }).then((transacao) => {
        res.render('atualizar_transacao.html', { transacao });
    }).catch((err) => {
        console.log(err);
        res.redirect("/home");
    });
}

function atualizarTransacao(req, res) {
    Produto.findOne({
        where: {
            id: req.body.id_produto
        }
    }).then((produto) => {
        Transacao.findOne({
            where: {
                id: req.body.id
            }
        }).then((transacaoAnterior) => {
            let volumeTransacao = null;
            let quantTotal = produto.quantidade + transacaoAnterior.quantidade;
            if (req.body.quantidade >= quantTotal) {
                volumeTransacao = quantTotal;
            } else {
                volumeTransacao = req.body.quantidade;
            }
            if (volumeTransacao < 1) volumeTransacao = 1;

            produto.quantidade += transacaoAnterior.quantidade - volumeTransacao;

            let precoTotal = produto.preco * volumeTransacao;
            Produto.update({
                quantidade: produto.quantidade
            }, {
                where: {
                    id: produto.id
                }
            });
            Transacao.update({
                descricao: req.body.descricao,
                quantidade: volumeTransacao,
                total: precoTotal
            }, {
                where: {
                    id: req.body.id
                }
            }).then(() => {
                res.redirect("/home");
            });
        });
    });
}

module.exports = {
    indexView,
    homeView,
    cadastrarProduto,
    configProductView,
    atualizarProduto,
    excluirProduto,
    cadastrarTransacao,
    configTransactionView,
    atualizarTransacao,
    excluirTransacao
}