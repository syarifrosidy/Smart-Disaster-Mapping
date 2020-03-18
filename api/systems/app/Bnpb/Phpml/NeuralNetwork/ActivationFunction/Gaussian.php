<?php

declare(strict_types=1);

namespace App\Bnpb\Phpml\NeuralNetwork\ActivationFunction;

use App\Bnpb\Phpml\NeuralNetwork\ActivationFunction;

class Gaussian implements ActivationFunction
{
    /**
     * @param float|int $value
     */
    public function compute($value): float
    {
        return exp(-pow($value, 2));
    }

    /**
     * @param float|int $value
     * @param float|int $calculatedvalue
     */
    public function differentiate($value, $calculatedvalue): float
    {
        return -2 * $value * $calculatedvalue;
    }
}
