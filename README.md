<h3 align="center">
  Incident tracker
</h3>
⚠️ <strong>Esse repositorio possui duas branchs, uma com o codigo feito durante os 3 dias, e a outra branch com o codigo feito no 4 dia.</strong> ⚠️

<p align="center">
  <a href="#rocket-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#fire-requisios">Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#fire-iniciar-backend">Iniciar Backend</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

## Sobre
Aplicativo desenvolvido para o processo seletivo.

## Requisitos
Certifique-se de ter os seguintes requisitos instalados:

- PHP (>= 8.0)
- Composer
- MySQL ou outro banco de dados suportado
- Node.js e npm ou yarn


## 🔥 Iniciar Backend

1. **Clone o repositório:**
   ```bash
     > git clone https://github.com/LucasrsRodrigues/redbelt.git
     > cd redbelt/backend
   ```
2. **Instale as dependências do PHP:**
   ```bash
   > composer install
   ```
3. **Crie o arquivo .env:**
   ```bash
   > cp .env.example .env
   ```
4. **Configure o arquivo .env**
  ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=nome_do_banco
    DB_USERNAME=seu_usuario
    DB_PASSWORD=sua_senha
  ```
5. **Gere a chave da aplicação**
   ```bash
   > php artisan migrate
   ```
6. **Execute as migrações:**
   ```bash
   > php artisan migrate
   ```
 7. **Rode o backend**
    ```bash
    > php artisan serve
    ```
## 🔥 Iniciar Frontend

1. **Acesse o diretorio:**
   ```bash
     > cd ..
     > cd redbelt/incident-report
   ```
2. **Instale as dependências do React:**
   ```bash
   > npm install | yarn
   ```
3. **Rode o frontend**
    ```bash
    > npx expo start
    ```
    
