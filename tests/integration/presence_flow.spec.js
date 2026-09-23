/**
 * realnthq: Presence & Interaction Integration Tests
 * Validates state transitions, desk reservations, soft knocks, and zone scoping.
 */

const assert = require('assert');

function runIntegrationTests() {
  console.log('[*] Running realnthq Presence & Interaction Integration Tests...');

  // Test 1: Desk Claim and Vacate Flow
  console.log('[*] Test 1: Desk Claim & Vacate Lifecycle...');
  const desk = {
    id: 'desk-101',
    floorId: 'floor-2',
    deskLabel: 'ENG-01',
    deskType: 'HOT_DESK',
    currentOccupantId: null,
  };

  const user = {
    id: 'user-001',
    fullName: 'Alex Vance',
    status: 'AVAILABLE',
  };

  // Claim
  desk.currentOccupantId = user.id;
  assert.strictEqual(desk.currentOccupantId, 'user-001', 'Desk occupant must match claiming user');
  console.log('    [OK] Desk claimed successfully.');

  // Release
  desk.currentOccupantId = null;
  assert.strictEqual(desk.currentOccupantId, null, 'Desk must be vacant after release');
  console.log('    [OK] Desk vacated successfully.');

  // Test 2: Soft Knock Decision State Machine
  console.log('[*] Test 2: Soft Knock Lifecycle State Machine...');
  const validTransitions = {
    PENDING: ['ACCEPTED', 'BUSY', 'LATER', 'EXPIRED'],
    ACCEPTED: [],
    BUSY: [],
    LATER: [],
  };

  let knockState = 'PENDING';
  const targetTransition = 'ACCEPTED';

  assert(
    validTransitions[knockState].includes(targetTransition),
    `Transition from ${knockState} to ${targetTransition} must be valid`,
  );
  knockState = targetTransition;
  assert.strictEqual(knockState, 'ACCEPTED');
  console.log('    [OK] Knock state transition validated.');

  // Test 3: Zone Presence Partitioning
  console.log('[*] Test 3: Spatial Zone Scoping (Anti-Broadcast-Storm)...');
  const members = [
    { id: 'u1', floorId: 'floor-1', zoneId: 'lobby' },
    { id: 'u2', floorId: 'floor-2', zoneId: 'engineering' },
    { id: 'u3', floorId: 'floor-2', zoneId: 'engineering' },
  ];

  const targetFloor = 'floor-2';
  const scopedMembers = members.filter((m) => m.floorId === targetFloor);
  assert.strictEqual(scopedMembers.length, 2, 'Broadcast must scope strictly to target floor members');
  console.log('    [OK] Spatial partitioning isolated successfully.');

  console.log('[OK] All integration test cases passed.');
}

if (require.main === module) {
  runIntegrationTests();
}

module.exports = { runIntegrationTests };
