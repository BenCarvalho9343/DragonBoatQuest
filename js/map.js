const TILE_SIZE = 16;

const COLOURS = {
  0:  '#1a6b9e',  // water
  1:  '#3a7d2c',  // grass
  2:  '#8B6914',  // dock planks
  3:  '#5a4a3a',  // caldecotte club hut
  4:  '#2a6a3a',  // loughborough river bank
  5:  '#4a3a2a',  // loughborough rival hut
  6:  '#2a2000',  // nottingham river bank
  7:  '#3a2a1a',  // nottingham rival hut
  8:  '#3a5a2a',  // st neots meadow bank
  9:  '#2a4a1a',  // st neots rival hut
  10: '#2a2a3a',  // middlesbrough industrial bank
  11: '#3a3a4a',  // middlesbrough rival hut
  12: '#0a1a3a',  // liverpool dock bank
  13: '#1a0a0a',  // liverpool rival hut
};

function getMapData() {
  const venue = VENUES[STATE.currentVenue];
  return venue ? venue.mapData : VENUES.caldecotte.mapData;
}

function isWalkable(x, y) {
  const MAP_DATA = getMapData();
  const col = Math.floor(x / TILE_SIZE);
  const row = Math.floor(y / TILE_SIZE);
  if (row < 0 || row >= MAP_DATA.length) return false;
  if (col < 0 || col >= MAP_DATA[0].length) return false;
  return MAP_DATA[row][col] !== 0;
}

function isAtMapEdge(player) {
  return player.x > 440;
}

function drawMap(ctx) {
  const MAP_DATA = getMapData();
  MAP_DATA.forEach((row, r) => {
    row.forEach((tile, c) => {
      ctx.fillStyle = COLOURS[tile] || '#000';
      ctx.fillRect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    });
  });
}