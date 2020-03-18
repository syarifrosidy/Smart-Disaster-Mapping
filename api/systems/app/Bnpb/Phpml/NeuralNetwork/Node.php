<?php

declare(strict_types=1);

namespace App\Bnpb\Phpml\NeuralNetwork;

interface Node
{
    public function getOutput(): float;
}
