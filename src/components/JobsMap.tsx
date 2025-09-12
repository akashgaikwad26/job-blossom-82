import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

// Fix default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
  const nearbyJobs: Job[] = [
    {
      id: '1',
      title: 'Senior Electrician',
      company: 'Metro Construction',
      location: 'Bandra, Mumbai',
      salary: '₹25,000-35,000',
      type: 'Full-time',
      coordinates: [19.0596, 72.8400], // Note: Leaflet uses [lat, lng] format
      distance: '2.5 km'
    },
    {
      id: '2',
      title: 'Plumber Technician',
      company: 'Home Services Pro',
      location: 'Andheri, Mumbai',
      salary: '₹20,000-30,000',
      type: 'Part-time',
      coordinates: [19.1136, 72.8697],
      distance: '4.2 km'
    },
    {
      id: '3',
      title: 'Construction Worker',
      company: 'BuildTech Solutions',
      location: 'Powai, Mumbai',
      salary: '₹18,000-25,000',
      type: 'Full-time',
      coordinates: [19.1176, 72.9050],
      distance: '6.8 km'
    },
    {
      id: '4',
      title: 'Maintenance Electrician',
      company: 'Residential Complex',
      location: 'Malad, Mumbai',
      salary: '₹22,000-32,000',
      type: 'Full-time',
      coordinates: [19.1875, 72.8484],
      distance: '8.1 km'
    }
  ];

  // Custom icons for job markers and user location
  const jobIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const userLocation: [number, number] = [19.0596, 72.8400]; // Bandra coordinates

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
        <div className="w-full h-64 rounded-lg overflow-hidden">
          <MapContainer
            center={[19.0760, 72.8777]} // Mumbai center
            zoom={11}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* User location marker */}
            <Marker position={userLocation} icon={userIcon}>
              <Popup>
                <div className="text-center">
                  <strong>Your Location</strong>
                  <br />
                  Bandra, Mumbai
                </div>
              </Popup>
            </Marker>

            {/* Job markers */}
            {nearbyJobs.map((job) => (
              <Marker key={job.id} position={job.coordinates} icon={jobIcon}>
                <Popup>
                  <div className="min-w-[200px]">
                    <h3 className="font-semibold text-sm mb-1">{job.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{job.company}</p>
                    <div className="flex items-center gap-2 text-xs mb-2">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium">{job.salary}</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {job.type}
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-success rounded-full border-2 border-white shadow"></div>
            <span>Your Location</span>
            <div className="w-3 h-3 bg-destructive rounded-full border-2 border-white shadow ml-4"></div>
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