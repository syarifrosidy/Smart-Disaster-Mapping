<?php

declare(strict_types=1);

namespace App\Bnpb\Phpml\NeuralNetwork\ActivationFunction;

use App\Bnpb\Phpml\NeuralNetwork\ActivationFunction;

class BinaryStep implements ActivationFunction
{
    /**
     * @param float|int $value
     */
    public function compute($value): float
    {
        return $value >= 0 ? 1.0 : 0.0;
    }

    /**
     * @param float|int $value
     * @param float|int $computedvalue
     */
    public function differentiate($value, $computedvalue): float
    {
        if ($value === 0 || $value === 0.0) {
            return 1;
        }

        return 0;
    }
}
