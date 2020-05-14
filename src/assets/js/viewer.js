/*
 * Camera Buttons
 */
var CameraButtons = function (blueprint3d) {
  var orbitControls = blueprint3d.three.controls;
  var three = blueprint3d.three;

  var panSpeed = 30;
  var directions = {
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4,
  };

  function init() {
    // Camera controls
    $("#zoom-in").click(zoomIn);
    $("#zoom-out").click(zoomOut);
    $("#zoom-in").dblclick(preventDefault);
    $("#zoom-out").dblclick(preventDefault);

    $("#reset-view").click(three.centerCamera);

    $("#move-left").click(function () {
      pan(directions.LEFT);
    });
    $("#move-right").click(function () {
      pan(directions.RIGHT);
    });
    $("#move-up").click(function () {
      pan(directions.UP);
    });
    $("#move-down").click(function () {
      pan(directions.DOWN);
    });

    $("#move-left").dblclick(preventDefault);
    $("#move-right").dblclick(preventDefault);
    $("#move-up").dblclick(preventDefault);
    $("#move-down").dblclick(preventDefault);
  }

  function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function pan(direction) {
    switch (direction) {
      case directions.UP:
        orbitControls.panXY(0, panSpeed);
        break;
      case directions.DOWN:
        orbitControls.panXY(0, -panSpeed);
        break;
      case directions.LEFT:
        orbitControls.panXY(panSpeed, 0);
        break;
      case directions.RIGHT:
        orbitControls.panXY(-panSpeed, 0);
        break;
    }
  }

  function zoomIn(e) {
    e.preventDefault();
    orbitControls.dollyIn(1.1);
    orbitControls.update();
  }

  function zoomOut(e) {
    e.preventDefault;
    orbitControls.dollyOut(1.1);
    orbitControls.update();
  }

  init();
};

/*
 * Context menu for selected item
 */

var ContextMenu = function (blueprint3d) {
  var scope = this;
  var selectedItem;
  var three = blueprint3d.three;

  function init() {
    three.itemSelectedCallbacks.add(itemSelected);
    three.itemUnselectedCallbacks.add(itemUnselected);
  }

  function itemSelected(item) {
    var event = new CustomEvent("onItemSelected", {
      detail: item,
    });
    document.dispatchEvent(event);
    selectedItem = item;
  }

  function itemUnselected() {
    var event = new CustomEvent("onItemUnselected");
    document.dispatchEvent(event);
    selectedItem = null;
  }

  init();
};

/*
 * Loading modal for items (required)
 */
var ModalEffects = function (blueprint3d) {
  var scope = this;
  var blueprint3d = blueprint3d;
  var itemsLoading = 0;

  this.setActiveItem = function (active) {
    itemSelected = active;
    update();
  };

  function update() {
    if (itemsLoading == 0) {
      var event = new CustomEvent("onItemsLoaded", {});
      document.dispatchEvent(event);
    }
  }

  function init() {
    blueprint3d.model.scene.itemLoadingCallbacks.add(function () {
      itemsLoading += 1;
      update();
    });

    blueprint3d.model.scene.itemLoadedCallbacks.add(function () {
      itemsLoading -= 1;
      update();
    });

    update();
  }

  init();
};

/*
 * Model viewer (required)
 */
var ModelViewer = function (blueprint3d) {
  var blueprint3d = blueprint3d;
  var scope = this;

  function init() {
    blueprint3d.three.updateWindowSize();
    // set item unselected
    blueprint3d.three.getController().setSelectedObject(null);

    // show and hide the right divs
    $("#viewer").show();
    blueprint3d.model.floorplan.update();
    blueprint3d.three.updateWindowSize();
  }

  init();
};

function loadDefaultDesign(context, roomPlan) {
  context.model.loadSerialized(roomPlan);
}

function initializeRoomView(roomPlan) {
  // main setup
  var opts = {
    floorplannerElement: "floorplanner-canvas",
    threeElement: "#viewer",
    threeCanvasElement: "three-canvas",
    textureDir: "models/textures/",
    widget: false,
  };

  var blueprint3d = new BP3D.Blueprint3d(opts);

  new ModalEffects(blueprint3d);
  new ContextMenu(blueprint3d);
  new ModelViewer(blueprint3d);
  new CameraButtons(blueprint3d);

  loadDefaultDesign(blueprint3d, JSON.stringify(roomPlan));
}
