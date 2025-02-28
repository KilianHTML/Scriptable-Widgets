const imagePath = "sidestore.png";

async function loadImage() {
    let fm = FileManager.iCloud();
    let path = fm.joinPath(fm.documentsDirectory(), imagePath);
    
    if (!fm.fileExists(path)) {
        console.error("Image not found: " + path);
        return null;
    }

    await fm.downloadFileFromiCloud(path); 
    return fm.readImage(path);
}

async function createWidget() {
    let widget = new ListWidget();
    let image = await loadImage();

    if (image) {
        widget.backgroundImage = image;
    } else {
        widget.addText("Image not found!").textColor = Color.red();
    }

    widget.addSpacer(145); 

    let text = widget.addText("Refresh");
    text.textColor = Color.black();
    text.font = Font.boldSystemFont(16);
    text.centerAlignText();

     widget.addSpacer(10);

    let url = "shortcuts://run-shortcut?name=Refresh SideStore";
    widget.url = url;

    return widget;
}

let widget = await createWidget();
Script.setWidget(widget);
App.close();
Script.complete();
