INSERT INTO SysObi.dbo.Users (Name, Email, PasswordHash, Role)
VALUES (
    'Administrador',
    'dmin@gmail.com',
    '$2a$11$AOAE5.Ar9GFOxctkvrCByu2HAPLOyR3xXpdhEQhtnp2P4ElbCyVzG',  -- senha: Admin1234
    1  -- Role: Admin (ajuste conforme seu enum)
);