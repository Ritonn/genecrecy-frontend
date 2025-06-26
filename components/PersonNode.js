import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function PersonNode({ nodeDatum }) {
  const baseHeight = 40;
  const basePadding = 12;
  const fontSize = 20;
  const radius = 10;
  const spacing = 10;
  const connexion = "<>"

  const iconPath = faHeart.icon[4];

  const name1 = nodeDatum.name || '';
  const name2 = nodeDatum.conjointData?.name || '';

  const name1Width = name1.length * fontSize * 0.6 + basePadding * 2;
  const name2Width = name2.length * fontSize * 0.6 + basePadding * 2;

  const generation = nodeDatum.attributes?.idGeneration;
  let color;

  if (nodeDatum.isCoupleNode) {
    return null; // Rend le noeud complètement invisible
  }

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
    color = '#ccc'; // gris si inconnu
  }

  const totalWidth = name1Width + (nodeDatum.conjointData ? (name2Width) : 0);

  return (
    <g>
      {/* Person principale */}
      {/* Cercle principal */}
      <circle
        r={radius}
        fill={color}
        stroke="#black"
        strokeWidth={1}
      />

      {/* Nom à droite du cercle */}
      <text
        x={radius + spacing}
        y={2}
        textAnchor="start"
        alignmentBaseline="middle"
        fontSize={fontSize}
        fontWeight="thin"
        fill="black"
      >
        {name1}
      </text>

      {/* Ligne de connexion entre les conjoints
      {nodeDatum.conjointData && (
      <line
        x1={radius}
        y1={0}
        x2={name1Width + spacingBetweenPartners}
        y2={0}
        stroke="black"
        strokeWidth={1}
      />
      )} */}

      {/* Conjoint (si présent) */}
      {nodeDatum.conjointData && (
      <>
        <path
        d={iconPath}
        transform={`scale(0.03) translate(${name1Width*28}, -270)`}
        fill="black"
        />

        <circle
          cx={name1Width + radius}
          r={radius}
          ry={5}
          fill={color}
          stroke="#black"
          strokeWidth={1}
        />
        <text
          x={name1Width + 2 * radius + 10}
          y={2}
          textAnchor="start"
          alignmentBaseline="middle"
          fontSize={fontSize}
          fill="black"
        >
            {name2}
          </text>
        </>
      )}
    </g>
  );
}
