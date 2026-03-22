const TILE_SIZE = 16;

const COLOURS = {
  0:  '#1a6b9e',
  1:  '#3a7d2c',
  2:  '#8B6914',
  3:  '#5a4a3a',
  4:  '#2a6a3a',
  5:  '#4a3a2a',
  6:  '#2a2000',
  7:  '#3a2a1a',
  8:  '#3a5a2a',
  9:  '#2a4a1a',
  10: '#2a2a3a',
  11: '#3a3a4a',
  12: '#0a1a3a',
  13: '#1a0a0a',
  14: '#0a0a1a',
  15: '#1a1a2a',
  16: '#2a2a3a',
  17: '#3a3a4a',
  18: '#3a1a00',
  19: '#2a1000',
  20: '#0a0a2a',
  21: '#1a1a3a',
};

function getMapData() {
  if (STATE.inWorldChamps) {
    const venue = WORLD_VENUES[STATE.currentWorldVenue];
    return venue ? venue.mapData : WORLD_VENUES.duisburg.mapData;
  }
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
      ctx.fillRect(c * TILE_SIZE, r * TILE_SIZE,
        TILE_SIZE, TILE_SIZE);
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(c * TILE_SIZE, r * TILE_SIZE,
        TILE_SIZE, TILE_SIZE);
    });
  });
}