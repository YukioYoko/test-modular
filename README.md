Npm install

Crean en pgAdmin la base llamada modular, y crean el archivo .env, agregan 
DATABASE_URL="postgresql://User:Contra@localhost:5432/Modular"
# Connect to Supabase via connection pooling
DATABASE_URL="postgresql://postgres.pionbvcfoddhwpnhlech:[YOUR-PASSWORD]@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection to the database. Used for migrations
DIRECT_URL="postgresql://postgres.pionbvcfoddhwpnhlech:[YOUR-PASSWORD]@aws-1-us-east-1.pooler.supabase.com:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon-publica

Una vez creado ejecutan los siguientes comandos

npx prisma db push
npx prisma generate
npm install @supabase/supabase-js
npm install framer-motion
npx prisma migrate dev --name init_supabase

Ya que lo generaron inserten los registros, estan en un json en la carpeta de prisma (pidanselo a chatgpt que les genere el insert)

ya que tengan eso:

npm run dev

la pagina principal no la he configurado pero metanse a la ventana /login

Y empiecen a probar funciones
