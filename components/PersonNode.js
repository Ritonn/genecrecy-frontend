export default function PersonNode({ nodeDatum }) {
  const baseHeight = 40;
  const basePadding = 12;
  const fontSize = 12;
  const spacingBetweenPartners = 10;

  const name1 = nodeDatum.name || '';
  const name2 = nodeDatum.conjointData?.name || '';

  const name1Width = name1.length * fontSize * 0.6 + basePadding * 2;
  const name2Width = name2.length * fontSize * 0.6 + basePadding * 2;

  const generation = nodeDatum.attributes?.idGeneration;
  let color;

  if (generation === 1) {
    color = '#7f7f7f';
  } else if (generation === 2) {
    color = '#006400';
  } else if (generation === 3) {
    color = '#1e90ff';
  } else if (generation === 4) {
    color = '#ff0000';
  } else if (generation === 5) {
    color = '#ffd700';
  } else if (generation === 6) {
    color = '#8a2be2';
  } else if (generation === 7) {
    color = '#ff69b4';
  } else {
    color = '#ccc';
  }

  const totalWidth = name1Width + (nodeDatum.conjointData ? (name2Width + spacingBetweenPartners) : 0);

  return (
    <g>
      {/* Person principale */}
      <rect
        x={-totalWidth / 2}
        y={-baseHeight / 2}
        width={name1Width}
        height={baseHeight}
        rx={6}
        fill={color}
        stroke="#333"
        strokeWidth={1}
      />
      <text
        x={-totalWidth / 2 + name1Width / 2}
        y={4}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize={fontSize}
        fill="#fff"
      >
        {name1}
      </text>

      {/* Conjoint (si présent) */}
      {nodeDatum.conjointData && (
        <>
          <rect
            x={-totalWidth / 2 + name1Width + spacingBetweenPartners}
            y={-baseHeight / 2}
            width={name2Width}
            height={baseHeight}
            rx={6}
            fill="#68d391"
            stroke="#333"
            strokeWidth={1}
          />
          <text
            x={-totalWidth / 2 + name1Width + spacingBetweenPartners + name2Width / 2}
            y={4}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={fontSize}
            fill="#000"
          >
            {name2}
          </text>
        </>
      )}
    </g>
  );
}
