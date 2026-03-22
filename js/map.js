const TILE_SIZE = 16;

const COLOURS = {
  0: '#1a6b9e',
  1: '#3a7d2c',
  2: '#8B6914',
  3: '#5a4a3a',
  4: '#2a6a3a',
  5: '#4a3a2a',
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