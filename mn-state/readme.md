
verificar que os botoes das outras subviews nao colidem (mesmo tendo a mesma class)
ok ver se o bundle nao tem mais jqueryes e backbones que os necessarios




Ideias about "app" and "sub-app"

When we say an app to start, we always have to give a region where the app will live


App is a higher level concept. App correspondes to different parts of the application that are started and stopped according to the user's interactions.

This allows to more easily separate functionality into their own "boxes"

App.start({
  region: ...
})

Radio.channel("main").trigger("show", "MyView", this.region)

now, if my view has a subview that is always show, we will have

Radio.channel("main").trigger("show", "MySubView", this.hardcodedRegion)

this trigger will always happen. When the view is shown, the subview will also be shown.


for modals

ModalApp


modalApp.start()



an app is coupled with one or more views, but not with regions (which is given when the app starts)
when the app starts, it will render its views (and subviews), and show them in the given region
this way the app is reusable because we can give it another region, and it will work perfectly