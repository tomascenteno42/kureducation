'use strict'

const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const View = use('Adonis/Src/View')

  View.global('range', (start, size) => {
    return [...Array(size).keys()].map(i => i + start)
  })
})

hooks.before.httpServer(async () => {

        const User = use('App/Models/User')
        try{
            const user = await User.query().where({email: process.env.SUPERADMIN_EMAIL}).first()
            if(!user) {
                try {
                    const usuario = await User.create({
                        username: process.env.SUPERADMIN_USERNAME,
                        email: process.env.SUPERADMIN_EMAIL,
                        password: process.env.SUPERADMIN_PASSWORD,
                        superadmin: true
                    })
                } catch (error) {
                    console.log(error);
                }
            }    
        }catch(error) {
            console.log(error)
        }
})