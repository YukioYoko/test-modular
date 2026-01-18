Npm install

Crean en pgAdmin la base llamada modular, y crean el archivo .env, agregan 


# Formato: postgresql://USUARIO:CONTRASEÑA@HOST:PUERTO/NOMBRE_BD
#DATABASE_URL="postgresql://postgres:yuko141002@localhost:5432/Foodlify"
DATABASE_URL="postgresql://neondb_owner:npg_Qqc7DRHTp6lS@ep-withered-river-ahnhmx9o-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require" 
# Connect to Supabase via connection pooling
#DATABASE_URL="postgresql://postgres.pionbvcfoddhwpnhlech:m4bm94Gng0Vurs5Q@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection to the database. Used for migrations
DIRECT_URL="postgresql://postgres.pionbvcfoddhwpnhlech:m4bm94Gng0Vurs5Q@aws-1-us-east-1.pooler.supabase.com:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL=https://pionbvcfoddhwpnhlech.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpb25idmNmb2RkaHdwbmhsZWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1ODQ5MTcsImV4cCI6MjA4NDE2MDkxN30.Mg7OS5Qo3JjlWOOZrf2aI1zY0ZJDgNtl3rXFCs-Tjqo



Una vez creado ejecutan los siguientes comandos

npx prisma db pull
npx prisma generate


Ya que lo generaron inserten los registros, estan en un json en la carpeta de prisma (pidanselo a chatgpt que les genere el insert)

ya que tengan eso:

npm run dev


Y empiecen a probar funciones
