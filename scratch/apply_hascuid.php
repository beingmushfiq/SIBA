<?php

$modelsPath = dirname(__DIR__) . '/siba-api/app/Models';
$files = glob($modelsPath . '/*.php');

foreach ($files as $file) {
    $content = file_get_contents($file);
    
    // Check if it has $incrementing = false
    if (strpos($content, '$incrementing = false') !== false) {
        
        // Check if HasCuid is already used
        if (strpos($content, 'use HasCuid') === false) {
            
            // Add namespace import
            if (strpos($content, 'use App\Models\Concerns\HasCuid;') === false) {
                $content = preg_replace('/namespace App\\\Models;/', "namespace App\\Models;\n\nuse App\\Models\\Concerns\\HasCuid;", $content);
            }
            
            // Add trait use
            if (preg_match('/class [a-zA-Z0-9]+ extends [a-zA-Z0-9]+.*?\n\{/', $content, $matches)) {
            	$classStart = $matches[0];
            	if (strpos($content, 'use ') !== false && strpos($content, 'use ', strpos($content, $classStart)) !== false) {
            		// Already has some traits (like HasFactory)
            		// This is tricky with regex, simpler to just inject after {
            		$content = str_replace($classStart, $classStart . "\n    use HasCuid;", $content);
            	} else {
            		$content = str_replace($classStart, $classStart . "\n    use HasCuid;", $content);
            	}
            }
            
            file_put_contents($file, $content);
            echo "Updated $file\n";
        }
    }
}
