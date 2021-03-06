/**
 * Hand-rolled shim that accepts Leaflet as a parameter and adds the MousePosition plugin
 */
export default function AddMousePosition(L) {
  L.Control.MousePosition = L.Control.extend({
    options: {
      position: "bottomleft",
      separator: " : ",
      emptyString: "Unavailable",
      lngFirst: false,
      numDigits: 5,
      lngFormatter: undefined,
      latFormatter: undefined,
      prefix: ""
    },

    onAdd(map) {
      this._container = L.DomUtil.create("div", "leaflet-control-mouseposition")
      L.DomEvent.disableClickPropagation(this._container)
      map.on("mousemove", this._onMouseMove, this)
      this._container.innerHTML = this.options.emptyString
      return this._container
    },

    onRemove(map) {
      map.off("mousemove", this._onMouseMove)
    },

    _onMouseMove(e) {
      const lng = this.options.lngFormatter
        ? this.options.lngFormatter(e.latlng.lng)
        : L.Util.formatNum(e.latlng.lng, this.options.numDigits)
      const lat = this.options.latFormatter
        ? this.options.latFormatter(e.latlng.lat)
        : L.Util.formatNum(e.latlng.lat, this.options.numDigits)
      const value = this.options.lngFirst
        ? lng + this.options.separator + lat
        : lat + this.options.separator + lng
      const prefixAndValue = this.options.prefix + " " + value
      this._container.innerHTML = prefixAndValue
    }
  })

  L.Map.mergeOptions({
    positionControl: false
  })

  L.Map.addInitHook(function() {
    if (this.options.positionControl) {
      this.positionControl = new L.Control.MousePosition()
      this.addControl(this.positionControl)
    }
  })

  L.control.mousePosition = function(options) {
    return new L.Control.MousePosition(options)
  }
}
