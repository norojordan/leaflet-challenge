# leaflet-challenge
Visualizing Data with Leaflet


<img width="683" alt="Screen Shot 2022-04-09 at 9 01 21 PM" src="https://user-images.githubusercontent.com/95200975/162596822-a7e25bf8-b318-47d0-b2fc-6ed6bff1e40c.png">

1.  The first task is to visualize an earthquake data set.

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON Feed page and pick a data set to visualize. When you click on a data set, for example "All Earthquakes from the Past 7 Days", you will be given a JSON representation of that data. You will use the URL of this JSON to pull in the data for our visualization.

2.  Import & Visualize the Data

  -  Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

  -  Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earthquake by color. Earthquakes with higher     magnitudes should appear larger and earthquakes with greater depth should appear darker in color.

  -  HINT: The depth of the earth can be found as the third coordinate for each earthquake.

  -  Include popups that provide additional information about the earthquake when a marker is clicked.

  -  Create a legend that will provide context for your map data.



BONUS: More Data (Optional)

The USGS wants you to plot a second data set on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in a second data set and visualize it alongside your original set of data. Data on tectonic plates can be found at https://github.com/fraxen/tectonicplates.
In this step, you will:

Plot a second data set on our map.

Add a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.

Add layer controls to our map.
