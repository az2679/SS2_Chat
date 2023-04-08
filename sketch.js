
let chatWindow, chat, sideBar, chatName, infoButton
let infoTab, infoWindow, infoDis
let infoToggle = true

function setup() {
  createCanvas(windowWidth, windowHeight);

  chatWindow = new Group()
    chatWindow.color = 255
    chatWindow.stroke = 0
    chatWindow.collider = 's'

  chat = new chatWindow.Sprite(width/2, height/2)
    chat.w = width*0.7
    chat.h = height*0.8
    chat.x = chat.x - windowWidth*0.1
  
  sideBar = new chatWindow.Sprite()
    sideBar.y = chat.y
    sideBar.h = chat.h 
    sideBar.w = chat.w * 0.35
    sideBar.x = (chat.x - (chat.w/2)) + (sideBar.w/2)
    sideBar.color = 230
  
  chatName = new chatWindow.Sprite()
    chatName.w = chat.w - sideBar.w
    chatName.x = (sideBar.x + (sideBar.w/2)) + (chatName.w/2)
    chatName.h = chat.h*0.1
    chatName.y = (chat.y - (chat.h/2)) + (chatName.h/2)
  //sprite instead of line so can change image and can have context scroll under the name / sandwich between

  infoButton = new chatWindow.Sprite()
    infoButton.d = chatName.h*0.35
    let margin = 3
    infoButton.x = (chatName.x + (chatName.w/2)) - (infoButton.d/2)* margin 
    infoButton.y = (chatName.y - (chatName.h/2)) + (infoButton.d/2)* margin

  infoTab = new Group()
    infoTab.color=200
    infoTab.stroke=0
    infoTab.collider='s'
  //new group so can toggle visiblity when pushing button 
  infoWindow = new infoTab.Sprite()
    infoWindow. x = infoButton.x
    infoWindow.w = (chatName.w) * 0.6
    infoWindow.h = (chat.h - chatName.h) * 0.92
    infoWindow.y = (infoButton.y + infoButton.d/2) + infoWindow.h/2 + margin*2




}

function draw() {
  background(220);

  if (infoToggle){
    infoTab.visible = true
  }
  if (!infoToggle){
    infoTab.visible = false
  } 

  infoDis = dist(mouseX, mouseY, infoButton.x, infoButton.y)

}

function mousePressed(){
  if (infoDis < infoButton.r){
    infoToggle = !infoToggle
  }
}