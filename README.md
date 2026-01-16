Npm install

Crean en pgAdmin la base llamada modular, y crean el archivo .env, agregan DATABASE_URL="postgresql://User:Contra@localhost:5432/Modular"

Una vez creado ejecutan los siguientes comandos

npx prisma db push
npx prisma generate

Ya que lo generaron inserten los registros, estan en un json en la carpeta de prisma (pidanselo a chatgpt que les genere el insert)

ya que tengan eso:

npm run dev

la pagina principal no la he configurado pero metanse a la ventana /login

Y empiecen a probar funciones
