
import React, { useState } from 'react';
import SiteHeader from '@/components/layout/SiteHeader';
import BiologyModelViewer from '@/components/biology/BiologyModelViewer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

const models = [
  {
    id: 'animal-cell',
    name: 'Animal Cell',
    description: 'Explore the internal structure of an animal cell with all major organelles.',
    modelPath: '/models/animal-cell.glb', // These paths are placeholders
    parts: [
      { id: 'nucleus', name: 'Nucleus', description: 'Contains the cell\'s genetic material and controls cellular activities.' },
      { id: 'mitochondria', name: 'Mitochondria', description: 'Powerhouse of the cell, produces energy through cellular respiration.' },
      { id: 'ribosomes', name: 'Ribosomes', description: 'Site of protein synthesis within the cell.' },
      { id: 'golgi', name: 'Golgi Apparatus', description: 'Modifies, sorts, and packages proteins for secretion or use within the cell.' },
      { id: 'er', name: 'Endoplasmic Reticulum', description: 'Network of membranes involved in protein and lipid synthesis.' },
      { id: 'membrane', name: 'Cell Membrane', description: 'Selectively permeable barrier that regulates what enters and exits the cell.' }
    ]
  },
  {
    id: 'plant-cell',
    name: 'Plant Cell',
    description: 'Discover the unique structures of plant cells compared to animal cells.',
    modelPath: '/models/plant-cell.glb',
    parts: [
      { id: 'chloroplasts', name: 'Chloroplasts', description: 'Contains chlorophyll and is responsible for photosynthesis.' },
      { id: 'vacuole', name: 'Central Vacuole', description: 'Large water-filled sac that maintains turgor pressure and stores nutrients.' },
      { id: 'cell-wall', name: 'Cell Wall', description: 'Rigid outer layer that provides structural support and protection.' },
      { id: 'nucleus', name: 'Nucleus', description: 'Contains the cell\'s genetic material and controls cellular activities.' },
      { id: 'cytoplasm', name: 'Cytoplasm', description: 'Gel-like substance where cellular components are suspended.' }
    ]
  },
  {
    id: 'human-organs',
    name: 'Human Organs',
    description: 'Explore key human organs and their functions within the body.',
    modelPath: '/models/human-organs.glb',
    parts: [
      { id: 'heart', name: 'Heart', description: 'Muscular organ that pumps blood through the circulatory system.' },
      { id: 'brain', name: 'Brain', description: 'Control center for the nervous system, processes sensory information and coordinates body activities.' },
      { id: 'lungs', name: 'Lungs', description: 'Organs of respiration where oxygen enters the bloodstream and carbon dioxide is removed.' }
    ]
  },
  {
    id: 'dna',
    name: 'DNA Double Helix',
    description: 'Visualize the structure of DNA and understand how genetic information is stored.',
    modelPath: '/models/dna.glb',
    parts: [
      { id: 'adenine', name: 'Adenine (A)', description: 'Nitrogenous base that pairs with thymine in DNA.' },
      { id: 'thymine', name: 'Thymine (T)', description: 'Nitrogenous base that pairs with adenine in DNA.' },
      { id: 'guanine', name: 'Guanine (G)', description: 'Nitrogenous base that pairs with cytosine in DNA.' },
      { id: 'cytosine', name: 'Cytosine (C)', description: 'Nitrogenous base that pairs with guanine in DNA.' },
      { id: 'backbone', name: 'Sugar-Phosphate Backbone', description: 'Alternating sugar and phosphate groups that form the structural framework of DNA.' }
    ]
  },
  {
    id: 'microscope',
    name: 'Compound Microscope',
    description: 'Learn about the parts and functions of a compound microscope.',
    modelPath: '/models/microscope.glb',
    parts: [
      { id: 'eyepiece', name: 'Eyepiece (Ocular)', description: 'The lens you look through, typically magnifies 10x.' },
      { id: 'objective', name: 'Objective Lens', description: 'Primary magnifying lens closest to the specimen.' },
      { id: 'stage', name: 'Stage', description: 'Platform where the specimen slide is placed for viewing.' },
      { id: 'fine-knob', name: 'Fine Adjustment Knob', description: 'Used for precise focusing after initial focus is achieved.' },
      { id: 'coarse-knob', name: 'Coarse Adjustment Knob', description: 'Used for initial focusing of the specimen.' }
    ]
  }
];

const BiologyModels = () => {
  const [selectedModel, setSelectedModel] = useState(models[0]);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-green-50">
      <SiteHeader />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">3D Biology Models</h1>
          <p className="text-gray-600 mt-2">Explore interactive 3D models of biological structures</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <Tabs defaultValue={selectedModel.id} onValueChange={(value) => {
                  const model = models.find(m => m.id === value);
                  if (model) setSelectedModel(model);
                }}>
                  <TabsList className="grid grid-cols-5 w-full">
                    {models.map((model) => (
                      <TabsTrigger key={model.id} value={model.id} className="text-xs">
                        {model.name.split(' ')[0]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {models.map((model) => (
                    <TabsContent key={model.id} value={model.id}>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{model.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{model.description}</p>
                        
                        <h4 className="text-sm font-medium mb-2">Components:</h4>
                        <ul className="space-y-2">
                          {model.parts.map((part) => (
                            <li key={part.id} className="text-sm">
                              <span className="font-medium">{part.name}:</span> {part.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden h-[500px]">
            <BiologyModelViewer model={selectedModel} />
          </div>
        </div>
      </main>
      
      <footer className="bg-white py-6 border-t">
        <div className="container text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Science Lab AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default BiologyModels;
