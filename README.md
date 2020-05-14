# virtual-trade-fair-app
During the Corona pandemic more and more fairs and conferences were cancelled, so I started to design this webapp. It allows a very rudimentary construction of a virtual fair stand. 

![main screen](https://github.com/stone18x/virtual-trade-fair-app/blob/master/.readme/main_screen.png)

The roomplaner is taken and adapted from https://github.com/furnishup/blueprint3d. 

## Prerequisites
1. Install node and npm (https://nodejs.org/en/).
2. Install angular cli: `npm install -g @angular/cli`
3. Clone this repository. 
4. Change to the folder where you downloaded the repository. 
5. Start the webapp: `ng serve`.

## Functions
At the moment two different function types are available.

### Table
The table is intended to simulate a market stand with various brochures. In the left half a text is displayed after selecting the table. After clicking on the details button, a gallery is opened, where various pictures and their texts are displayed. 

![gallery screen](https://github.com/stone18x/virtual-trade-fair-app/blob/master/.readme/gallery.png)

### TV
You have to think of the TV as a modern large flat screen where videos are played. After clicking on the TV, a text is displayed on the left side where there is a details button. After clicking on it, a video is shown. 

![video screen](https://github.com/stone18x/virtual-trade-fair-app/blob/master/.readme/video.png)

## Configuration 
The configuration of this app is based on yaml configuration files. These files are stored in `src/assets/custom`.

### Room Configuration
As mentioned before the 3D room is taken from blueprint 3D. Blueprint 3D enables the storage of a json file, which is loaded in 
virtual-trade-fair-app. So the file `room.json` in `src/assets/custom` is loaded as 3D room. 

### Banner Configuration
To configure the banner the file `banner.yaml` in `src/assets/custom/content` must be adapted. The title and sub title can be adapted. 

### Table Configuration
The related file of the table configuration is `content.yaml` in `src/assets/custom/content/1`. Basically, you can configure the content that is displayed after someone clicks on the table. Furthermore, the images and their texts can be configured flexibly. 

### TV Configuration
The related file of the table configuration is `content.yaml` in `src/assets/custom/content/2`. As in the previous configuration one can configure the content that is displayed after someone clicks on the TV. Additionally a video URL can be deposited, which is then played. 
