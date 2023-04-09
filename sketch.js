
let chatWindow, chat, sideBar, chatName, infoButton

let infoTab, infoWindow, infoDis
let infoToggle = true
let infoIconArray, infoIcon, infoChatName, infoComArray, infoCom, infoChange, infoMemNum, infoLocShare, infoDivider, infoLocSend
let infoMemberArray, infoMember, infoNameArray, infoName
let friendInQ, mouseDrag, removeButton, leftBound, infoWindowLine
let removeToggle = false

let hideChat, hideChatBlock, hideChatLine

let chatElement, windowButtons, searchBar, messageBar

let contextElement, sideIconArray, sideIcon, sideNameArray, sideName, sideDividerArray, sideDivider, chatIcon, chatTextArray, chatText


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
    infoMember.y = (infoMemNum.y + infoMemNum.h/2) + (infoMember.d * 1.2 * infoMemberArray.length) - infoMember.r
    infoMember.x = infoChange.x - infoChange.w/2 + infoMember.r
    infoMember.stroke = infoMember.color
  }
  infoMemberArray[3].color = 20

  infoNameArray = []
  while(infoNameArray.length < 5){
    infoName = new infoTab.Sprite()
    infoNameArray.push(infoName)
    infoName.h = textHeight
    infoName.w = 150
    infoName.y = (infoMemNum.y + infoMemNum.h/2) + (infoName.h * 1.38 * infoNameArray.length) - infoName.h/2
    infoName.x = infoMember.x + infoMember.r + infoName.w/2 + 10
    infoName.color = infoWindow.color
    infoName.stroke = infoWindow.color
  }
  infoNameArray[0].text = 'Friend 1                             '
  infoNameArray[1].text = 'Friend 2                             '
  infoNameArray[2].text = 'Friend 3                             '
  infoNameArray[3].text = 'Friend in Question             '
  infoNameArray[4].text = 'Add Member                      '

  infoLocShare = new infoTab.Sprite()
  infoLocShare.h = textHeight*0.75
  // infoLocShare.y = infoWindow.y + infoWindow.h/2 - infoLocShare.h*1.5
  infoLocShare.y = infoMemNum.y + (infoMemNum.h/2) + (infoMember.d * (infoMemberArray.length+1)) + infoLocShare.h*1.25
  infoLocShare.w = infoWindow.w*0.5
  infoLocShare.x = infoChange.x - infoChange.w/2 + infoLocShare.w/2

  friendInQ = new infoTab.Sprite()
  friendInQ.x = infoWindow.x
  friendInQ.y = infoNameArray[3].y
  friendInQ.w = infoWindow.w - 2
  friendInQ.h = infoNameArray[3].h + 10
  friendInQ.collider='s'
  friendInQ.color= infoWindow.color
  friendInQ.stroke= infoWindow.color
  friendInQ.layer = 17

  removeButton = new infoTab.Sprite()
  removeButton.x = infoWindow.x + infoWindow.w/4
  removeButton.y = infoNameArray[3].y
  removeButton.w = (infoWindow.w/2) -2
  removeButton.h = infoNameArray[3].h + 8
  removeButton.collider='s'
  removeButton.color='red'
  removeButton.stroke = removeButton.color
  removeButton.layer = 16
  removeButton.text = '                         Remove'
  removeButton.textColor = 255

  hideChat = new chatWindow.Sprite()
  hideChat.h = chat.h/2
  hideChat.y = chat.y + chatName.h
  hideChat.w = (infoWindow.x-infoWindow.w/2) - (sideBar.x+sideBar.w/2) 
  hideChat.x = (sideBar.x+sideBar.w/2) + hideChat.w/2
  hideChat.color = chat.color
  hideChat.stroke = chat.color
  hideChat.layer = 25

  infoWindowLine = new infoTab.Sprite()
  infoWindowLine.x = infoWindow.x - infoWindow.w/2
  infoWindowLine.w=0
  infoWindowLine.h = infoWindow.h
  infoWindowLine.y = infoWindow.y
  infoWindowLine.stroke = 0

  infoDivider = new infoTab.Sprite()
  infoDivider.w = infoWindow.w - (2*((infoLocShare.x-infoLocShare.w/2) - (infoWindow.x-infoWindow.w/2)))
    //taking margin between location text and window edge (multiply by 2 since 2 margins)
  infoDivider.h = 0
  infoDivider.x = (infoLocShare.x-infoLocShare.w/2) + infoDivider.w/2
  infoDivider.y = infoLocShare.y + infoLocShare.h/2 + textHeight/2
  infoDivider.stroke = 0

  infoLocSend = new infoTab.Sprite()
  infoLocSend.h = textHeight * 0.75
  infoLocSend.y = infoDivider.y + textHeight/2 + infoLocSend.h/2
  infoLocSend.w = infoWindow.w*0.4
  infoLocSend.x = infoChange.x - infoChange.w/2 + infoLocSend.w/2

  //using parameters from draw to have tab semi pulled out in set up
  leftBound = (infoWindow.x - infoWindow.w/4) 
  friendInQ.x = leftBound + (friendInQ.w*0.1)
  infoMemberArray[3].x = ((leftBound - friendInQ.w/2) + infoMemberArray[3].d*1.3) + (friendInQ.w*0.1)
  infoNameArray[3].x = ((leftBound - friendInQ.w/2) + infoNameArray[3].w) + (friendInQ.w*0.1)

  chatElement = new Group()
    chatElement.collider='s'
    chatElement.color = 245

  windowButtons = new chatElement.Sprite()
    //doesn't resize so hard code placement
    windowButtons.w = 60
    windowButtons.x = (sideBar.x - sideBar.w/2) + windowButtons.h
    windowButtons.h = 25
    windowButtons.y = (sideBar.y - sideBar.h/2) + windowButtons.h*1.2

  searchBar = new chatElement.Sprite()
    searchBar.w = sideBar.w - ((windowButtons.x-windowButtons.w/2)-(sideBar.x-sideBar.w/2))*2
      //margin between buttons and edge of side bar. *2 for two margins
    searchBar.x = sideBar.x
    searchBar.h = textHeight
    searchBar.y = (sideBar.y - sideBar.h/2) + searchBar.h/2 + windowButtons.h*2.5

  contextElement = new Group()
    contextElement.collider='s'
    contextElement.color = 245

  sideIconArray = []
  while(sideIconArray.length < 8){
    sideIcon = new contextElement.Sprite()
    sideIconArray.push(sideIcon)
    sideIcon.d = 45
    sideIcon.y = (searchBar.y + searchBar.h/2) + (sideIcon.d * sideIconArray.length * 1.65) - sideIcon.r
    sideIcon.x = searchBar.x - searchBar.w/2 + sideIcon.d
    sideIcon.stroke = sideIcon.color
  }

  sideNameArray = []
  while(sideNameArray.length < 8){
    sideName = new contextElement.Sprite()
    sideNameArray.push(sideName)
    sideName.h = textHeight *0.75
    sideName.w = 150
    sideName.y = (searchBar.y + searchBar.h/2) + (sideName.h * (sideNameArray.length-1) * 3.3) + sideName.h*1.5
    sideName.x = sideIcon.x + sideIcon.r + sideName.w/2 + 10
    sideName.stroke = sideName.color
  }

  sideDividerArray = []
  while(sideDividerArray.length < 7){
    sideDivider = new contextElement.Sprite()
    sideDividerArray.push(sideDivider)
    sideDivider.h = 0
    sideDivider.w = (searchBar.w) - ((sideName.x-sideName.w/2)-(searchBar.x-searchBar.w/2))
    sideDivider.y = (searchBar.y + searchBar.h/2) + (sideName.h * (sideDividerArray.length) * 3.3) + sideName.h/2
    sideDivider.x = sideIcon.x + sideIcon.r + sideDivider.w/2 + 10
    sideDivider.stroke = 250
  }

  sideTextArray = []
  while(sideTextArray.length < 7){
    sideText = new contextElement.Sprite()
    sideTextArray.push(sideText)
    sideText.h = textHeight*0.75
    sideText.w = sideDivider.w
    sideText.y = ((searchBar.y + searchBar.h/2) + sideName.h*2) +(sideText.h * (sideTextArray.length-1) * 3.3) + sideText.h/2
    sideText.x = sideIcon.x + sideIcon.r + sideText.w/2 + 10
    sideText.color = 230
    sideText.stroke = sideText.color
  }
  sideTextArray1 = []
  while(sideTextArray1.length < 7){
    sideText1 = new contextElement.Sprite()
    sideTextArray1.push(sideText1)
    sideText1.h = textHeight*0.75
    sideText1.w = sideDivider.w
    sideText1.y = ((searchBar.y + searchBar.h/2) + sideName.h*2) +(sideText1.h * (sideTextArray1.length-1) * 3.3) + sideText1.h/2 + sideText.h -5
    sideText1.x = sideIcon.x + sideIcon.r + sideText1.w/2 + 10
    sideText1.color = 230
    sideText1.stroke = sideText1.color
  }

  sideTextArray[0].text = 'There is a friend group of 5 people.          '
  sideTextArray[1].text ='However, one of the friends has been the'
  sideTextArray1[1].text ='the target of rumors going around,           '
  sideTextArray[2].text ='leading to distrust and tension/conflicts    '
  sideTextArray1[2].text = 'within the friend group.                             '
  sideTextArray[4].text = 'The friends turn to the unspoken leader    '
  sideTextArray1[4].text = 'of their group for a solution.                      '

  hideChatBlock = new chatElement.Sprite()
  hideChatBlock.x = sideIconArray[7].x
  hideChatBlock.w = sideIconArray[7].d
  hideChatBlock.h = sideIconArray[7].r
  hideChatBlock.y = sideBar.y+sideBar.h/2 + hideChatBlock.h/2
  hideChatBlock.color = 220
  hideChatBlock.stroke = hideChatBlock.color
  //background color
  hideChatLine = new chatElement.Sprite()
  hideChatLine.x = sideBar.x
  hideChatLine.w = sideBar.w
  hideChatLine.h = 0
  hideChatLine.y = sideBar.y+sideBar.h/2 -1
  hideChatLine.stroke = 0

  let chatMessageX = (chat.x-chat.w/2) + (sideBar.w) 

  messageBar = new chatElement.Sprite()
  messageBar.h = textHeight
  messageBar.y = chat.y + chat.h/2 - messageBar.h*1.5
  messageBar.w = (chat.w - sideBar.w) * 0.9
  messageBar.x = chatMessageX + messageBar.w/2 + ((chat.w - sideBar.w)*0.05)
  messageBar.color = 0
  messageBar.layer=3


  chatIcon = new contextElement.Sprite()
  chatIcon.d = 40
  chatIcon.y = messageBar.y - messageBar.h/2 - chatIcon.d*1.2
  chatIcon.x = messageBar.x - messageBar.w/2 + chatIcon.r

  chatTextArray = []
  while(chatTextArray.length < 3){
    chatText = new contextElement.Sprite()
    chatTextArray.push(chatText)
    chatText.h = textHeight*0.75
    chatText.w = chatName.w*0.5
    chatText.y = (messageBar.y) - (chatText.h * chatTextArray.length * 1.2) - messageBar.h
    chatText.x = (chatName.x-chatName.w/2) + chatText.w*0.78
    chatText.color = 200
    chatText.stroke = chatText.color
    chatText.textColor=0
  }

  chatTextArray[2].text = 'Despite lack of verification of the rumors,                       '
  chatTextArray[1].text = 'should the friend group exclude the friend in question   '
  chatTextArray[0].text = ' from the group to improve their overall harmony?           '


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
  mouseDrag = pmouseX - mouseX
  

  if(!removeToggle){
  if (mouseIsPressed === true){
    if (mouseX > (friendInQ.x-friendInQ.w/2) && mouseX < (friendInQ.x+friendInQ.w/2) && mouseY > (friendInQ.y-friendInQ.h/2) && mouseY < (friendInQ.y+friendInQ.h/2)){
      // friendInQ.x = mouseX
      friendInQ.x = friendInQ.x - mouseDrag
      //trying to move by changes in mouseX. less jarring, more drag
      infoMemberArray[3].x = infoMemberArray[3].x - mouseDrag
      infoNameArray[3].x = infoNameArray[3].x - mouseDrag
    }

    if(friendInQ.x >= infoWindow.x-10){
      friendInQ.x = infoWindow.x
      infoMemberArray[3].x = infoChange.x - infoChange.w/2 + infoMember.r
      infoNameArray[3].x = infoMember.x + infoMember.r + infoName.w/2 + 10
    }
    if (friendInQ.x <= leftBound){
      friendInQ.x = leftBound 
      infoMemberArray[3].x = ((leftBound - friendInQ.w/2) + infoMemberArray[3].d*1.3)
      infoNameArray[3].x = ((leftBound - friendInQ.w/2) + infoNameArray[3].w)
    }
  }
}

  if (removeToggle){
    friendInQ.visible = false
    removeButton.visible = false
    infoMemberArray[3].visible = false
    infoNameArray[3].visible = false

    infoMemberArray[4].y = infoMemberArray[3].y 
    infoNameArray[4].y = infoNameArray[3].y
    //moves up one in array

    infoLocShare.y = infoMemNum.y + (infoMemNum.h/2) + (infoMember.d * (infoMemberArray.length)) + infoLocShare.h*1.25
      //same as original, just changed array.length

    infoDivider.y = infoLocShare.y + infoLocShare.h/2 + 10
    // infoLocSend.visible = true
    infoLocSend.y = infoDivider.y + 10 + infoLocSend.h/2
  } else{ infoLocSend.visible = false}






}

function mousePressed(){
  if (infoDis < infoButton.r){
    infoToggle = !infoToggle
  }

  if (friendInQ.x<=leftBound && mouseX>(removeButton.x) && mouseX<(removeButton.x+removeButton.w/2) && mouseY>(removeButton.y-removeButton.h/2) && mouseY<(removeButton.y+removeButton.h/2)){
    removeToggle = !removeToggle
  }

}
