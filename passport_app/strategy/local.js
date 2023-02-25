const path = require('node:path');
const fs = require('node:fs');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const dbpath = path.join(__dirname, 'db.json');

passport.serializeUser((user, done) => {
  console.log('From: serializeUser');
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('From: deserializeUser');
  if (!fs.existsSync(dbpath)) {
    fs.writeFileSync(dbpath, JSON.stringify({ users: [] }));
  }

  const db = JSON.parse(fs.readFileSync(dbpath, { encoding: 'utf-8' }));

  let user = db.users.find((item) => item.id === id);

  if (!user) {
    done(new Error('Failed to deserialize'));
  }

  done(null, user);
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log('From: LocalStrategy');
    if (!fs.existsSync(dbpath)) {
      fs.writeFileSync(dbpath, JSON.stringify({ users: [] }));
    }

    const db = JSON.parse(fs.readFileSync(dbpath, { encoding: 'utf-8' }));

    let user = db.users.find((item) => {
      return item.username === username && item.password === password;
    });

    if (!user) {
      user = {
        id: Math.floor(Math.random() * 1000),
        username,
        password,
      };

      db.users.push(user);
      fs.writeFileSync(dbpath, JSON.stringify(db));
    }

    done(null, user);
  })
);
