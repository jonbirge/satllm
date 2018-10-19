import { CesiumEntityWrapper } from "./CesiumEntityWrapper";
import { DescriptionHelper } from "./DescriptionHelper";

import Cesium from "Cesium";
import dayjs from "dayjs";

export class GroundStationEntity extends CesiumEntityWrapper {
  constructor(viewer, sats, position) {
    super(viewer);
    this.sats = sats;

    this.name = "Ground station";
    this.position = position;

    this.createEntities();
  }

  createEntities() {
    this.createDescription();
    this.createGroundStation();
  }

  createGroundStation() {
    const billboard = new Cesium.BillboardGraphics({
      image: require("../assets/images/icons/dish.svg"),
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      width: 24,
      height: 24,
    });
    this.createCesiumEntity("Groundstation", "billboard", billboard, this.position.cartesian, false);
    this.defaultEntity = this.entities["Groundstation"];
  }

  createDescription() {
    const description = new Cesium.CallbackProperty((time) => {
      const transits = this.transits(time);
      const content = DescriptionHelper.renderDescription(time, this.name, this.position, transits);
      return content;
    });
    this.description = description;
  }

  transits(time, deltaHours = 48) {
    let transits = [];
    // Aggregate transits from all satellites
    for (let [name, sat] of Object.entries(this.sats.satellites)) {
      let satTransits = sat.orbit.transits.filter((transit) => {
        return dayjs(transit.start).diff(time, "hours") < deltaHours;
      }).map((transit) => {
        transit.name = name;
        return transit;
      });
      transits.push(...satTransits);
    }

    // Sort transits by time
    transits = transits.sort((a, b) => {
      return a.start - b.start;
    });
    return transits;
  }
}
