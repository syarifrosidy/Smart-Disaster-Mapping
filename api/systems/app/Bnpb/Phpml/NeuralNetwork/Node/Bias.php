<?php

declare(strict_types=1);

namespace App\Bnpb\Phpml\NeuralNetwork\Node;

use App\Bnpb\Phpml\NeuralNetwork\Node;

class Bias implements Node
{
    public function getOutput(): float
    {
        return 1.0;
    }
}
