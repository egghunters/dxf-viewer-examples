
import { FontFiles } from '@/Consts';
import * as VIEWER from 'x-viewer'

export const createViewer = async (viewerCfg?: VIEWER.Viewer2dConfig) => {
  console.log("Initializing viewer...");
  // need to init in mounted method, so it can find "myCanvas" in dom
  viewerCfg = viewerCfg || {
    containerId: "myCanvas",
    enableLayoutBar: true,
    enableSpinner: true,
    enableProgressBar: true,
  }
  const viewer = new VIEWER.Viewer2d(viewerCfg)

  const menuConfig = {
    [VIEWER.ToolbarMenuId.Settings]: {
      onActive: () => {
        alert("API is ready, but UI is not implemented yet!")
      },
      onDeactive: () => {
      },
      mutexIds: [
        VIEWER.ToolbarMenuId.Measure,
        VIEWER.ToolbarMenuId.MeasureDistance,
        VIEWER.ToolbarMenuId.MeasureArea,
        VIEWER.ToolbarMenuId.MeasureAngle,
        VIEWER.ToolbarMenuId.MeasureCoordinate,
      ],
    },
    [VIEWER.ToolbarMenuId.Layers]: {
      onActive: () => {
        alert("API is ready, but UI is not implemented yet!")
      },
      onDeactive: () => {
      },
      mutexIds: [
        VIEWER.ToolbarMenuId.Measure,
        VIEWER.ToolbarMenuId.MeasureDistance,
        VIEWER.ToolbarMenuId.MeasureArea,
        VIEWER.ToolbarMenuId.MeasureAngle,
        VIEWER.ToolbarMenuId.MeasureCoordinate,
      ],
    },
  };
  new VIEWER.AxisGizmoPlugin(viewer, { ignoreZAxis: true });
  new VIEWER.BottomBarPlugin(viewer);
  new VIEWER.MarkupPlugin(viewer);
  new VIEWER.MeasurementPlugin(viewer);
  new VIEWER.ScreenshotPlugin(viewer);
  new VIEWER.StatsPlugin(viewer);
  new VIEWER.HotpointPlugin(viewer);
  new VIEWER.Viewer2dToolbarPlugin(viewer, { menuConfig });

  // There is a bug when saving font file into indexeddb, to workaround it,
  // we need to set enableFontCache to false.
  // Call setFont([]) to make sure FontManager is being created in viewer.
  viewer.setFont([]);
  const fontManager = viewer.getFontManager()
  if (fontManager) {
      fontManager.enableFontCache = false;
  }

  await viewer.setFont(FontFiles)
  return viewer;
}