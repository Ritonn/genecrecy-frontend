export default function PersonNode({ nodeDatum }) {
  const width = 120;
  const height = 50;
  const spacing = 10; // espace entre les rectangles
  const person1Name = nodeDatum.name;
  const conjointName = nodeDatum.conjointData?.name;
  console.log(conjointName)
  const person1Width = String(person1Name).length*9;
  console.log(person1Width)
  const conjointWidth = String(conjointName).length*9;
  
  let color;
  const generation = nodeDatum.attributes?.idGeneration;

  if (generation === 1) {
    color = '#7f7f7f'; // Gris moyen
  } else if (generation === 2) {
    color = '#006400'; // Vert foncé (équivalent à l’arbre)
  } else if (generation === 3) {
    color = '#1e90ff'; // Bleu soutenu
  } else if (generation === 4) {
    color = '#ff0000'; // Rouge vif
  } else if (generation === 5) {
    color = '#ffd700'; // Jaune doré
  } else if (generation === 6) {
    color = '#8a2be2'; // Violet vif
  } else if (generation === 7) {
    color = '#ff69b4'; // Rose bonbon
  } else {
    color = '#ccc'; // Par défaut : gris clair
  }


  return (
    <g>
      {/* Rectangle principal */}
      <rect
        x={-person1Width / 2}
        y={-height / 2}
        width={person1Width}
        height={height}
        rx={10}
        fill={color}
        stroke="#2d3748"
        strokeWidth={1.5}
      />
      <text
        x={0}
        y={0}
        textAnchor="middle"
        alignmentBaseline="central"
        fontSize={12}
        fill="#ffffff"
        color="#ffffff"
      >
        {nodeDatum.name}
      </text>

      {/* Rectangle du conjoint, si présent */}
      {nodeDatum.conjointData && (
        <>
          <rect
            x={-conjointWidth / 2}
            y={height / 2 + spacing}
            width={conjointWidth}
            height={height}
            rx={8}
            fill="#68d391" // vert pour le conjoint
            stroke="#2d3748"
            strokeWidth={1.5}
          />
          <text
            x={0}
            y={height + spacing}
            textAnchor="middle"
            alignmentBaseline="central"
            fontSize={12}
            fill="#000"
          >
            {nodeDatum.conjointData.name}
          </text>
        </>
      )}
    </g>
  );
}
