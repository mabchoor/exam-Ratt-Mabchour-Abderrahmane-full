import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  clientForm: FormGroup;
  showForm = false;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder 
  ) {
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (err) => console.error('Error loading clients:', err)
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.clientForm.reset();
    }
  }

  onSubmitClient(): void {
    if (this.clientForm.valid) {
      const newClientData: Omit<Client, 'id'> = this.clientForm.value;
      this.clientService.createClient(newClientData).subscribe({
        next: (savedClient) => {
          this.clients.push(savedClient); 
          this.clientForm.reset();
          this.showForm = false; 
          console.log('Client created:', savedClient);
        },
        error: (err) => console.error('Error creating client:', err)
      });
    } else {
      console.error('Form is invalid');
      
      this.clientForm.markAllAsTouched();
    }
  }

  deleteClient(clientId: number, event: MouseEvent): void {
    event.stopPropagation(); 
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      this.clientService.deleteClient(clientId).subscribe({
        next: () => {
          this.clients = this.clients.filter(client => client.id !== clientId);
          console.log('Client deleted:', clientId);
        },
        error: (err) => console.error('Error deleting client:', err)
      });
    }
  }
}