export default {
  jwt: {
    secret: process.env.APP_SECRET || 'b5c0243d8cd5e793289a1c51938b1e12',
    expiresIn: '7d'
  }
}