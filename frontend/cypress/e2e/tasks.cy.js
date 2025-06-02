describe('Todo List Application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should add a new task', () => {
    const taskTitle = 'Nouvelle tâche';
    const taskDescription = 'Description de la tâche';

    cy.get('input[placeholder="Titre de la tâche"]').type(taskTitle);
    cy.get('textarea[placeholder="Description de la tâche"]').type(taskDescription);
    cy.get('button').contains('Ajouter').click();

    cy.contains(taskTitle).should('be.visible');
    cy.contains(taskDescription).should('be.visible');
  });

  it('should update task status', () => {
    // Ajouter une tâche
    cy.get('input[placeholder="Titre de la tâche"]').type('Tâche à mettre à jour');
    cy.get('button').contains('Ajouter').click();

    // Changer le statut
    cy.get('select').first().select('in-progress');
    cy.get('select').first().should('have.value', 'in-progress');
  });

  it('should delete a task', () => {
    // Ajouter une tâche
    cy.get('input[placeholder="Titre de la tâche"]').type('Tâche à supprimer');
    cy.get('button').contains('Ajouter').click();

    // Supprimer la tâche
    cy.contains('Supprimer').click();
    cy.contains('Tâche à supprimer').should('not.exist');
  });
}); 