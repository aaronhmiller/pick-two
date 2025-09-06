// main.ts - Deno TypeScript server for Good/Fast/Cheap toggles

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Good, Fast, Cheap - Pick Two</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: #f0f4f8;
        }
        
        .container {
            background: white;
            padding: 3rem;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
        }
        
        h1 {
            text-align: center;
            color: #2d3748;
            margin-bottom: 2rem;
            font-size: 2rem;
        }
        
        .subtitle {
            text-align: center;
            color: #718096;
            margin-bottom: 2rem;
            font-size: 1.1rem;
        }
        
        .toggle-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.5rem;
            margin-bottom: 1rem;
            background: #f7fafc;
            border-radius: 12px;
            transition: all 0.3s ease;
        }
        
        .toggle-item:hover {
            background: #edf2f7;
        }
        
        .toggle-item.negative {
            background: #fed7d7;
        }
        
        .toggle-item.negative:hover {
            background: #fecaca;
        }
        
        .toggle-label {
            font-size: 1.2rem;
            font-weight: 500;
            color: #2d3748;
            transition: all 0.3s ease;
        }
        
        .toggle-label.negative {
            color: #e53e3e;
            font-weight: 600;
        }
        
        /* Toggle Switch Styles */
        .toggle-switch {
            position: relative;
            width: 60px;
            height: 32px;
        }
        
        .toggle-switch input {
            display: none;
        }
        
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #cbd5e0;
            transition: 0.4s;
            border-radius: 34px;
        }
        
        .slider:before {
            position: absolute;
            content: "";
            height: 24px;
            width: 24px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: 0.4s;
            border-radius: 50%;
        }
        
        input:checked + .slider {
            background-color: #48bb78;
        }
        
        .toggle-item.negative input:checked + .slider {
            background-color: #e53e3e;
        }
        
        input:checked + .slider:before {
            transform: translateX(28px);
        }
        
        .info {
            text-align: center;
            color: #718096;
            margin-top: 2rem;
            font-size: 0.9rem;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Project Triangle</h1>
        <div class="subtitle">You can have all three... but there's a catch!</div>
        
        <div class="toggle-item" id="item-safe">
            <span class="toggle-label" id="label-safe">Safe</span>
            <label class="toggle-switch">
                <input type="checkbox" id="toggle-safe" data-name="safe">
                <span class="slider"></span>
            </label>
        </div>
        
        <div class="toggle-item" id="item-fast">
            <span class="toggle-label" id="label-fast">Fast</span>
            <label class="toggle-switch">
                <input type="checkbox" id="toggle-fast" data-name="fast">
                <span class="slider"></span>
            </label>
        </div>
        
        <div class="toggle-item" id="item-cheap">
            <span class="toggle-label" id="label-cheap">Cheap</span>
            <label class="toggle-switch">
                <input type="checkbox" id="toggle-cheap" data-name="cheap">
                <span class="slider"></span>
            </label>
        </div>
        
        <div class="info" id="info">
            Turn on all three to see what happens...
        </div>
    </div>
    
    <script>
        const toggles = {
            safe: { 
                el: document.getElementById('toggle-safe'), 
                label: document.getElementById('label-safe'), 
                item: document.getElementById('item-safe'),
                positive: 'Safe', 
                negative: 'Risky' 
            },
            fast: { 
                el: document.getElementById('toggle-fast'), 
                label: document.getElementById('label-fast'), 
                item: document.getElementById('item-fast'),
                positive: 'Fast', 
                negative: 'Slow' 
            },
            cheap: { 
                el: document.getElementById('toggle-cheap'), 
                label: document.getElementById('label-cheap'), 
                item: document.getElementById('item-cheap'),
                positive: 'Cheap', 
                negative: 'Expensive' 
            }
        };
        
        const info = document.getElementById('info');
        let lastActivated = null;
        
        function updateToggles() {
            const checkedToggles = Object.keys(toggles).filter(key => toggles[key].el.checked);
            
            // If less than 3 toggles are on, reset all to positive state
            if (checkedToggles.length < 3) {
                Object.keys(toggles).forEach(key => {
                    toggles[key].label.textContent = toggles[key].positive;
                    toggles[key].label.classList.remove('negative');
                    toggles[key].item.classList.remove('negative');
                });
                info.textContent = checkedToggles.length === 2 
                    ? "Perfect! You've picked two." 
                    : "Turn on all three to see what happens...";
                lastActivated = null;
            } 
            // If all three are checked, make the last activated one negative
            else if (checkedToggles.length === 3) {
                // First reset all to positive
                Object.keys(toggles).forEach(key => {
                    toggles[key].label.textContent = toggles[key].positive;
                    toggles[key].label.classList.remove('negative');
                    toggles[key].item.classList.remove('negative');
                });
                
                // Find which toggle was just clicked
                const justClicked = event.target.dataset.name;
                lastActivated = justClicked;
                
                // Make the just-clicked toggle show its negative state
                toggles[justClicked].label.textContent = toggles[justClicked].negative;
                toggles[justClicked].label.classList.add('negative');
                toggles[justClicked].item.classList.add('negative');
                
                info.textContent = \`You can have all three, but \${toggles[justClicked].positive} becomes \${toggles[justClicked].negative}!\`;
            }
        }
        
        // Add event listeners
        Object.keys(toggles).forEach(key => {
            toggles[key].el.addEventListener('change', function(e) {
                // If turning off a toggle that was showing negative, reset it
                if (!e.target.checked && lastActivated === key) {
                    toggles[key].label.textContent = toggles[key].positive;
                    toggles[key].label.classList.remove('negative');
                    toggles[key].item.classList.remove('negative');
                    lastActivated = null;
                }
                updateToggles();
            });
        });
    </script>
</body>
</html>
`;

// Start the server
const server = Deno.serve({ port: 8000 }, (req) => {
    return new Response(html, {
        headers: {
            "content-type": "text/html; charset=utf-8",
        },
    });
});

console.log("Server running on http://localhost:8000");
console.log("Press Ctrl+C to stop the server");
