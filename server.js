const http = require('node:http');
const fs = require('node:fs');
const mime = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'jpg': 'image/jpg',
    'ico': 'image/x-icon',
    'mp3': 'audio/mpeg3',
    'mp4': 'video/mp4',
}



const servidor = http.createServer((pedido, respuesta) => {
    const url = new URL('http://localhost:8888' + pedido.url);
    let camino = url.pathname;

    if (camino == '/') {
        camino = 'index.html';
    }

    else {
        camino = camino.substring(1);
    }

    encaminar(pedido, respuesta, camino);

})

servidor.listen(4444);

function encaminar(pedido, respuesta, camino) {
    console.log(camino);

    switch (camino) {
        case 'recuperardatos':
            recuperar(pedido, respuesta)

            break;

        default:
            fs.stat(camino, error => {
                if (!error) {

                    fs.readFile(camino, (error, contenido) => {
                        if (error) {
                            respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
                            respuesta.write('Error interno')
                            console.log(error);
                            respuesta.end();
                        } else {
                            console.log(camino);
                            const vec = camino.split('.');
                            const ext = vec[vec.length - 1];
                            const mimearchivo = mime[ext]

                            respuesta.writeHead(200, { 'Content-Type': mime });
                            respuesta.write(contenido);
                            respuesta.end();
                        }
                    })
                } else {
                    respuesta.writeHead(404, { 'Content-Type': 'text/html' })
                    respuesta.write(`<!doctype html><html>
                            <head></head>
                            <body>
                                <h1>Pagina no encontrada</h1>
                            </body>  
                            </html>`)
                    respuesta.end()
                }
            })
            break;
    }

}

function recuperar(pedido, respuesta) {
    let info = '';
    pedido.on('data', datosparciales => {
        info += datosparciales;
    })
    
    pedido.on('end', ()=>{
        const formulario = new URLSearchParams(info);
        console.log(formulario);
        respuesta.writeHead(200,{'Content-Type': 'text/html'});
        const pagina = `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Document</title>
                        </head>
                        <body>
                            <p>El nombre de usuario ingresado fue: ${formulario.get('nombre')}</p>
                            <p>la contraseña ingresada fue: ${formulario.get('clave')}</p>
                            <a href="index.html">Retornar</a>
                        </body>
                        </html>`;

        respuesta.end(pagina);
        
    });
}


console.log('servidor web iniciado');