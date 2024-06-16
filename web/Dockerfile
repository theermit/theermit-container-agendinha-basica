# Usar uma imagem base do Node.js
FROM node:22

# Criar e definir o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar o package.json e o package-lock.json
COPY app .

# Instalar as dependências da aplicação
RUN npm install

# Expor a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "index.js"]