# Use a imagem oficial do Node.js como base
FROM ghcr.io/puppeteer/puppeteer:latest

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

USER root

RUN apt-get update && apt-get install -y \
  chromium \
  libnss3 \
  libatk1.0-0 \
  libcups2 \
  libxcomposite1 \
  libxrandr2 \
  libxdamage1 \
  libxkbcommon0 \
  libgbm1 \
  --no-install-recommends && \
  apt-get clean && rm -rf /var/lib/apt/lists/*

# Configure o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json para o contêiner
COPY package*.json ./

# Use o usuário node para garantir que a instalação ocorra com o usuário correto
USER root

# Instale as dependências do npm
RUN npm install

# Copie o restante do código para o contêiner
COPY . .

# Compile o código TypeScript para JavaScript
RUN npm run build

# Configure o Puppeteer para usar o Chromium instalado
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Exponha a porta que sua aplicação Node.js está ouvindo
EXPOSE 3000

# Comando para iniciar sua aplicação quando o contêiner for iniciado
CMD ["node", "./dist/src/server.js"]