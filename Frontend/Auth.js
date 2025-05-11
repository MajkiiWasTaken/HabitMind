const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // model uživatele

// Registrace
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  res.status(201).send('Uživatel registrován');
});

// Přihlášení
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Uživatel nenalezen');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).send('Neplatné heslo');

  const token = jwt.sign({ userId: user._id }, 'tajný_klíč');
  res.status(200).json({ token });
});
