import { useState, useCallback, useEffect } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [

    {
        id: '1',
        data: { label: 'Hello' },
        position: { x: 0, y: 0 },
        type: 'input',
    },
    {
        id: '2',
        data: { label: 'World' },
        position: { x: 100, y: 100 },
    },
];


const initialEdges = [
    { id: 'id0-id1', source: 'id0', target: 'id1', label: 'next', type: 'step' },
];

const createInitialEdges = (safeSequence) => {
    const edges = [];

    // edges.push({
    //     id: "id0-id1", source: "id0", target: "id1", label: 'next', type: 'step'
    // })
    const startX = 40;
    const startY = 40;
    const stepX = 180;
    const stepY = 100;
    for (let i = 0; i < safeSequence.length; i++) {
        const x = startX + (i % 2) * stepX; 
        const y = startY + Math.floor(i / 2) * stepY;
        edges.push(
            {
               id: `id${i}->id${i+1}`, source: `id${i}`, target: `id${i+1}`, label: '>', type: 'step'
            }
        ) }
        console.log("Edges",edges)
        return edges;
}

const createInitialNodes = (safeSequence) => {
    const nodes = [];
    // nodes.push({

    //     id: "0",
    //     data: { label: "dummy" },
    //     position: { x: 20, y: 20 },
    // });
    const startX = 40;
    const startY = 40;
    const stepX = 180;
    const stepY = 100;

    for (let i = 0; i < safeSequence.length; i++) {
        const x = startX + (i % 2) * stepX; 
        const y = startY + Math.floor(i / 2) * stepY;
        nodes.push(
            {
                id: "id" + i,
                data: { label: safeSequence[i] },
                position: { x: x, y: y },
            }
        )
    }
    console.log(nodes);
    return nodes;
}

function Flow({ safeSequence }) {

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    useEffect(() => {
        setNodes(createInitialNodes(safeSequence));
        setEdges(createInitialEdges(safeSequence));
    }, [safeSequence])


    return (
        <div style={{ height: '50vh', width: '100vh' }}>
            {safeSequence.length > 0 && 
            <ReactFlow
            colorMode="white"
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
            >
                <Background />
                <Controls />
            </ReactFlow>}
        </div>
    );

}

export default Flow;
