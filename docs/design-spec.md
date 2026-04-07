# Card Deck Shuffle - Design Spec

## Feature Overview
A new game mode where players tap a button to draw random question cards one at a time, creating an interactive card-shuffling experience with fail/success feedback.

## User Flow
1. Player opens the game
2. StartScreen shows two game mode options:
   - **Bingo Mixer** (existing 5x5 grid)
   - **Card Shuffle** (new feature)
3. Player taps "Card Shuffle"
4. CardDeckScreen displays:
   - Initial card drawn immediately (cards drawn: 1)
   - Skip/Like buttons for rapid-fire decisions
   - Keyboard shortcuts (← Arrow Left to skip, → Arrow Right to like)
   - Visual feedback for each action
   - Card counter tracking total cards drawn

## Design Details
- **Card Visual**: Large, tappable card with question text
- **Shuffle Logic**: Randomly select from questions array on each interaction
- **Animations**: Smooth card flip + action feedback
- **Actions**: 
  - Skip (👋) - Red/pink button - rejection/fail action
  - Like (💚) - Green button - acceptance/success action
  - Both actions immediately draw the next card and provide visual feedback
- **Keyboard Support**: Arrow keys (← skip, → like) for accessibility
- **State Management**: Separate deck state with card counter

## Implementation Status ✅

### Completed Steps
- [x] Step 1: Add game mode selection to StartScreen
- [x] Step 2: Create CardDeckScreen component
- [x] Step 3: Implement card draw and shuffle logic
- [x] Step 4: Add card flip animations and feedback
- [x] Step 5: Add immediate card draw on entry
- [x] Step 6: Implement left/right (skip/like) interaction
- [x] Step 7: Add keyboard shortcuts (arrow keys)

## Key Implementation Details
- Cards drawn immediately upon entering Card Shuffle mode
- Initial card count starts at 1 (shows user that a card is already drawn)
- Both Skip and Like buttons trigger new card draw via `onNextCard()`
- Visual feedback lasts 300ms after each action
- Status message: "👋 Skipped" or "💚 Liked!" 
- Keyboard shortcuts use `ArrowLeft` and `ArrowRight` events
- Arrow key handlers properly cleanup on component unmount

## Decisions Made
- Cards can repeat (simple random selection for MVP)
- No scoring/tracking - focus on quick card drawing experience
- Both game modes use same question pool
- Card design uses gradient background with emoji decoration
- Dual interaction methods (buttons + keyboard) for accessibility
- Visual feedback is brief (300ms) to allow quick rhythm of play

## UI Polish Notes
- Card has hover scale effect (105%) and active press animation (95%)
- Skip button: Red/pink color with border accent
- Like button: Green color with border accent
- Feedback text changes color: red for skip, green for like
- Theme toggle available in both modes
- Back button properly resets state and returns to menu
- Instructions provide clear guidance on both input methods

