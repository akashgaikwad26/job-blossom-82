import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  coordinates: [number, number];
  distance: string;
}

const JobsMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(false);

  const nearbyJobs: Job[] = [
    {
      id: '1',
      title: 'Senior Electrician',
      company: 'Metro Construction',
      location: 'Bandra, Mumbai',
      salary: '₹25,000-35,000',
      type: 'Full-time',
      coordinates: [72.8400, 19.0596], // Bandra coordinates
      distance: '2.5 km'
    },
    {
      id: '2',
      title: 'Plumber Technician',
      company: 'Home Services Pro',
      location: 'Andheri, Mumbai',
      salary: '₹20,000-30,000',
      type: 'Part-time',
      coordinates: [72.8697, 19.1136], // Andheri coordinates
      distance: '4.2 km'
    },
    {
      id: '3',
      title: 'Construction Worker',
      company: 'BuildTech Solutions',
      location: 'Powai, Mumbai',
      salary: '₹18,000-25,000',
      type: 'Full-time',
      coordinates: [72.9050, 19.1176], // Powai coordinates
      distance: '6.8 km'
    },
    {
      id: '4',
      title: 'Maintenance Electrician',
      company: 'Residential Complex',
      location: 'Malad, Mumbai',
      salary: '₹22,000-32,000',
      type: 'Full-time',
      coordinates: [72.8484, 19.1875], // Malad coordinates
      distance: '8.1 km'
    }
  ];

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      setIsTokenSet(true);
      initializeMap();
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [72.8777, 19.0760], // Mumbai center
      zoom: 11,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add job markers
    nearbyJobs.forEach((job) => {
      if (!map.current) return;

      // Create marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'job-marker';
      markerElement.style.cssText = `
        background: hsl(var(--primary));
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid white;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      `;

      // Create popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
      }).setHTML(`
        <div class="p-3 min-w-[200px]">
          <h3 class="font-semibold text-sm mb-1">${job.title}</h3>
          <p class="text-xs text-gray-600 mb-2">${job.company}</p>
          <div class="flex items-center gap-2 text-xs mb-2">
            <span class="inline-flex items-center gap-1">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              ${job.location}
            </span>
          </div>
          <div class="flex justify-between items-center text-xs">
            <span class="font-medium">${job.salary}</span>
            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">${job.type}</span>
          </div>
        </div>
      `);

      // Add marker to map
      new mapboxgl.Marker(markerElement)
        .setLngLat(job.coordinates)
        .setPopup(popup)
        .addTo(map.current);
    });

    // Add user location marker (example: Bandra as current location)
    const userMarker = document.createElement('div');
    userMarker.style.cssText = `
      background: hsl(var(--success));
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    `;

    new mapboxgl.Marker(userMarker)
      .setLngLat([72.8400, 19.0596]) // User's location
      .addTo(map.current);
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!isTokenSet) {
    return (
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Nearby Jobs Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-3">
                To view nearby jobs on the map, please enter your Mapbox public token.
              </p>
              <Input
                type="text"
                placeholder="Enter your Mapbox public token"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="mb-3"
              />
              <p className="text-xs text-muted-foreground mb-3">
                Get your token from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
              </p>
            </div>
            <Button type="submit" disabled={!mapboxToken.trim()}>
              Load Map
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Nearby Jobs Map
          </CardTitle>
          <Badge variant="secondary" className="bg-success/10 text-success">
            {nearbyJobs.length} jobs found
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={mapContainer} className="w-full h-64 rounded-lg" />
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-success rounded-full border-2 border-white shadow"></div>
            <span>Your Location</span>
            <div className="w-3 h-3 bg-primary rounded-full border-2 border-white shadow ml-4"></div>
            <span>Available Jobs</span>
          </div>
          
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {nearbyJobs.map((job) => (
              <div key={job.id} className="flex justify-between items-center p-2 bg-muted/30 rounded text-sm">
                <div>
                  <p className="font-medium">{job.title}</p>
                  <p className="text-muted-foreground text-xs">{job.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{job.distance}</p>
                  <Badge variant="outline" className="text-xs">{job.type}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobsMap;