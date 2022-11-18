# ingacodeTest
FrontEnd:
  Install dependencies: npm install
  Start front-end: npm start

BackEnd:
  Install dependencies: npm install
  Enviroment Variables:
    DATABASE_URL="sqlserver://HOST:PORT;database=DATABASE;user=USER;password=PASSWORD;encrypt=true"
    SECRET="secret"
    
  Create DB: npx prisma migrate dev
  Seed DB: npm run seed
  Start api: npm run dev
  
Login:
  Username: DarthVader
  Password: vader1234
    
