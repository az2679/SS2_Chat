
let chatWindow, chat, sideBar, chatName, infoButton

let infoTab, infoWindow, infoDis
let infoToggle = true
let infoIconArray, infoIcon
let infoChatName
let infoComArray, infoCom
let infoChange, infoMemNum
let infoMemberArray, infoMember


function setup() {
  createCanvas(windowWidth, windowHeight);

  let textHeight=30

  chatWindow = new Group()
    chatWindow.color = 255
    chatWindow.stroke = 0
    chatWindow.collider = 's'
    chatWindow.layer = 1

  chat = new chatWindow.Sprite(width/2, height/2)
    chat.w = width*0.7
    chat.h = height*0.85
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
    chatName.h = chat.h*0.12
    chatName.y = (chat.y - (chat.h/2)) + (chatName.h/2)
  //sprite instead of line so can change image and can have context scroll under the name / sandwich between



  infoButton = new chatWindow.Sprite()
    infoButton.d = chatName.h*0.3
    infoButton.y = chatName.y
    infoButton.x = (chatName.x + (chatName.w/2)) - infoButton.y* 0.3
    infoButton.layer = 3
  let infoButtonHover = new chatWindow.Sprite(infoButton.x, infoButton.y)
    infoButtonHover.w = infoButton.d + 15
    infoButtonHover.h = infoButtonHover.w
    infoButtonHover.layer = 2
    infoButtonHover.color = 255
    infoButtonHover.stroke = infoButtonHover.color
    //not sure if it makes cut to final design, blending it in for now

  infoTab = new Group()
    infoTab.color=230
    infoTab.stroke=infoTab.color
    infoTab.collider='s'
  //new group so can toggle visiblity when pushing button >> individual scene that mouse (+cam?) can navigate around in
  infoWindow = new infoTab.Sprite()
    infoWindow.x = infoButton.x
    infoWindow.w = (chatName.w) * 0.55
    infoWindow.h = (chat.h - chatName.h) * 0.95
    infoWindow.y = (infoButtonHover.y + infoButtonHover.h/2) + (infoWindow.h/2)
    infoWindow.color = 200
    infoWindow.stroke=0
  

  infoIconArray = []
  while(infoIconArray.length < 4){
    infoIcon = new infoTab.Sprite()
    infoIconArray.push(infoIcon)
    infoIcon.d = 50 - (infoIconArray.length*8)
    infoIcon.y = (infoWindow.y - infoWindow.h/2) + infoWindow.h*0.1
    infoIcon.x = infoWindow.x +5
    infoIcon.stroke = infoIcon.color
  }
  infoIconArray[0].x = infoIcon.x - (infoIconArray[0].r + 3)
  infoIconArray[1].x = infoIcon.x + (infoIconArray[1].r + 3)
  infoIconArray[2].x = infoIcon.x - (infoIconArray[2].r + 3)
  infoIconArray[3].x = infoIcon.x + (infoIconArray[3].r + 3)

  infoIconArray[3].y = infoIconArray[0].y - (infoIconArray[3].r + 5)
  infoIconArray[1].y = infoIconArray[0].y + (infoIconArray[1].r + 5)
  infoIconArray[2].y = infoIconArray[1].y + (infoIconArray[2].r + 5)

  infoChatName = new infoTab.Sprite()
    infoChatName.x = infoButton.x
    infoChatName.w = infoWindow.w * 0.3
    infoChatName.h = textHeight
    infoChatName.y = (infoIconArray[2].y + + infoIconArray[2].r) + 25

  infoComArray = []
  while(infoComArray.length < 3){
    infoCom = new infoTab.Sprite()
    infoComArray.push(infoCom)
    infoCom.d = textHeight
    infoCom.y = (infoChatName.y + + infoChatName.h/2) + 40
    infoCom.x = infoButton.x
  }
  infoComArray[0].x = infoCom.x - (infoWindow.w/4)
  infoComArray[2].x = infoCom.x + (infoWindow.w/4)

  infoChange = new infoTab.Sprite()
  infoChange.w = infoWindow.w*0.75
  infoChange.x = infoWindow.x - infoWindow.w*0.4 + infoChange.w/2 
  infoChange.h = textHeight
  infoChange.y = infoWindow.y * 0.92

  infoMemNum = new infoTab.Sprite()
  infoMemNum.h = textHeight/2
  infoMemNum.y = infoChange.y + infoChange.h*1.2
  infoMemNum.w = infoWindow.w*0.2
  infoMemNum.x = infoChange.x - infoChange.w/2 + infoMemNum.w/2

  infoMemberArray = []
  while(infoMemberArray.length < 5){
    infoMember = new infoTab.Sprite()
    infoMemberArray.push(infoMember)
    infoMember.d = 35
    infoMember.y = (infoMemNum.y + infoMemNum.h/2) + (infoMember.d *1.2 * infoMemberArray.length) - infoMember.r
    infoMember.x = infoChange.x - infoChange.w/2 + infoMember.r
    infoMember.stroke = infoMember.color
  }

  let infoLoc = new infoTab.Sprite()
  infoLoc.h = textHeight *0.6
  // infoLoc.y = infoWindow.y + infoWindow.h/2 - infoLoc.h*1.5
    infoLoc.y = infoMemNum.y + (infoMemNum.h/2) + (infoMember.d * (infoMemberArray.length+1)) + infoLoc.h*1.5
  infoLoc.w = infoWindow.w*0.4
  infoLoc.x = infoChange.x - infoChange.w/2 + infoLoc.w/2


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