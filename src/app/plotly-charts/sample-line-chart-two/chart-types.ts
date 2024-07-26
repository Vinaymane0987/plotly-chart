export interface Marker {
  color?: string | string[];
  size?: number | number[];
  symbol?: string | string[];
  line?: {
    color?: string | string[];
    width?: number | number[];
  };
  opacity?: number | number[];
  colorbar?: {
    title?: string;
    tickvals?: number[];
    ticktext?: string[];
  };
}

export interface Line {
  color?: string;
  width?: number;
  dash?: string; // 'solid', 'dot', 'dash', etc.
}

export interface Trace {
  x: number[] | string[];
  y: number[] | string[];
  type:
    | 'scatter'
    | 'bar'
    | 'pie'
    | 'box'
    | 'histogram'
    | 'heatmap'
    | 'surface'
    | 'scatter3d'
    | 'bar3d';
  mode?: 'lines' | 'markers' | 'lines+markers' | 'text';
  marker?: Marker;
  line?: Line;
  name?: string;
  hoverinfo?: string;
  text?: string[];
  opacity?: number;
  showlegend?: boolean;
  orientation?: 'h' | 'v';
  histfunc?: 'count' | 'sum' | 'avg' | 'min' | 'max';
  histnorm?: '' | 'percent' | 'probability' | 'density' | 'probability density';
  nbinsx?: number;
  nbinsy?: number;
  colorscale?: string | string[][];
  zmin?: number;
  zmax?: number;
}

export interface Axis {
  title?: string;
  showline?: boolean;
  zeroline?: boolean;
  showgrid?: boolean;
  tickvals?: number[];
  ticktext?: string[];
  autorange?: boolean | 'reversed';
  range?: [number, number];
  type?: 'linear' | 'log' | 'date' | 'category';
  tickangle?: number;
  tickformat?: string;
  tickformatstops?: {
    dtickrange?: [number | string, number | string];
    value: string;
  }[];
  gridcolor?: string;
  gridwidth?: number;
}

export interface Legend {
  y?: number;
  traceorder?: 'normal' | 'reversed';
  font?: TitleFont;
  yref?: 'paper' | 'y';
  bgcolor?: string;
  bordercolor?: string;
  borderwidth?: number;
  orientation?: 'v' | 'h'; // Orientation of the legend
  title?: string;
}

interface TitleFont {
  color?: string; // Font color
  family?: string; // Font family
  size?: number; // Font size
  style?: 'normal' | 'italic'; // Font style
  weight?: number | 'normal' | 'bold' | 'bolder' | 'lighter'; // Font weight
}

interface Margin {
  l?: number; // Left margin
  r?: number; // Right margin
  t?: number; // Top margin
  b?: number; // Bottom margin
  pad?: number; // Padding
}

interface Annotation {
  text: string; // Annotation text
  x: number; // X position
  y: number; // Y position
  xref?: 'paper' | 'x'; // Reference for x position
  yref?: 'paper' | 'y'; // Reference for y position
  showarrow?: boolean; // Show arrow pointing to annotation
  arrowhead?: number; // Arrowhead style
  ax?: number; // X offset for the arrow
  ay?: number; // Y offset for the arrow
  font?: TitleFont; // Font settings for the annotation
  bgcolor?: string; // Background color of the annotation
  bordercolor?: string; // Border color of the annotation
  borderwidth?: number; // Border width of the annotation
}

interface Layout {
  mode?: {
    color?: string;
  };
  title?:
    | string
    | {
        text?: string; // Title text
        font?: TitleFont; // Font settings for the title
        automargin?: boolean; // Automatically adjust margins
        pad?: Partial<Margin>; // Padding around the title
      };
  xaxis?: {
    title?: string; // X-axis title
    titlefont?: TitleFont; // Font settings for the x-axis title
    showline?: boolean;
    tickvals?: string[] | number[];
    ticktext?: string[] | number[];
    zeroline?: boolean;
    showgrid?: boolean;
  };
  yaxis?: {
    title?: string; // Y-axis title
    titlefont?: TitleFont; // Font settings for the y-axis title
    showline?: boolean;
    showgrid?: boolean;
    zeroline?: boolean;
  };
  legend?: Legend; // Legend settings
  margin?: Margin; // Margins around the plot
  height?: number; // Height of the plot
  width?: number; // Width of the plot
  colorway?: string[]; // Default colorway for traces
  shapes?: {
    type?: 'rect' | 'circle' | 'line' | 'path'; // Type of shape
    x0?: number; // Starting x coordinate
    y0?: number; // Starting y coordinate
    x1?: number; // Ending x coordinate
    y1?: number; // Ending y coordinate
  }[];
  responsive?: boolean;
  annotations?: Annotation[]; // Array of annotations
  showlegend?: boolean; // Show or hide the legend
}

export interface Config {
  staticPlot?: boolean; // If true, disables interactivity for export or image generation
  editable?: boolean; // If true, allows editing of titles, annotations, etc.
  autosizable?: boolean; // If true, enables autosizing the plot
  queueLength?: number; // Length of the undo/redo queue
  fillFrame?: boolean; // If true, fills the container or screen when autosizing
  frameMargins?: number; // Frame margins in percent of plot size
  scrollZoom?: boolean; // If true, enables zooming with the mouse wheel
  doubleClick?: 'reset' | 'autosize' | 'reset+autosize' | boolean; // Double click interaction
  showTips?: boolean; // If true, shows hints about interactivity
  showAxisDragHandles?: boolean; // If true, enables axis pan/zoom drag handles
  showAxisRangeEntryBoxes?: boolean; // If true, enables direct range entry at drag points
  showLink?: boolean; // If true, shows a link to open the plot in Plotly
  sendData?: boolean; // If true, sends data in the link
  linkText?: string; // Text appearing in the sendData link
  showSources?: boolean; // If true, displays sources in the link
  displayModeBar?: boolean | 'hover'; // Display the mode bar (true, false, or 'hover')
  modeBarButtonsToRemove?: string[]; // List of mode bar button names to remove
  modeBarButtonsToAdd?: string[]; // List of mode bar button names to add
  modeBarButtons?: boolean | any[]; // Custom mode bar buttons
  displaylogo?: boolean; // If true, displays the Plotly logo in the mode bar
  plotGlPixelRatio?: number; // Pixel ratio for GL plot images
  topojsonURL?: string; // URL to topojson files for geo charts
  mapboxAccessToken?: string; // Access token for Mapbox
}

export interface Graph {
  data: Trace[];
  layout: Layout;
  config?: Config;
}
