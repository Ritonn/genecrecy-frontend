import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import PersonNode from '../components/PersonNode';

const Tree = dynamic(() => import('react-d3-tree').then(mod => mod.default || mod.Tree), { ssr: false });

function Home() {
  const [treeData, setTreeData] = useState(null);

  const createCoupleNode = (node) => {
  const coupleNode = {
    name: 'CoupleNode',
    isCoupleNode: true,
    children: [
      {
        name: node.name,
        ...node,
        conjointData: node.conjointData,
        children: [] // empty! move children out
      },
      ...(node.children || []).map(child => createCoupleNode(child))
    ]
  };
  return coupleNode;
}

  useEffect(() => {
    async function fetchTree() {
      const response = await fetch('http://localhost:3000/api/arbre/681e6c6a7c81c7ebb080b91e');
      const data = await response.json();
      setTreeData(data);
      createCoupleNode(data);
      const treeWithCoupleNodes = createCoupleNode(data);
      setTreeData(treeWithCoupleNodes);
    }

    fetchTree();
  }, []);

  if (!treeData) return <p>Chargement de l’arbre…</p>;

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Tree
        data={[treeData]}
        orientation="horizontal"
        collapsible={false}
        pathFunc="step"
        translate={{ x: 100, y: 300 }}
        nodeSize={{ x: 150, y: 40 }}
        separation={{ siblings: 1, nonSiblings: 1 }}
        renderCustomNodeElement={({ nodeDatum, toggleNode, hierarchyPointNode }) => {
          if (nodeDatum.isCoupleNode) {
            // Décale ce noeud de jointure vers le parent principal
            return (
              <g transform={`translate(-10, 0)`}></g> // << Clé ici
            );
          }
          return <PersonNode nodeDatum={nodeDatum} />;
        }}
        zoomable={true}
        initialZoom={0.7} // optionnel : zoom de départ
        zoomExtent={[0.3, 3]} // <-- augmente le zoom max autorisé
      />
    </div>
  );
}

export default Home;
