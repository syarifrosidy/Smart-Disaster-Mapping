<?php

declare(strict_types=1);

namespace App\Bnpb\Phpml\Math\Distance;

use App\Bnpb\Phpml\Exception\InvalidArgumentException;
use App\Bnpb\Phpml\Math\Distance;

class Manhattan implements Distance
{
    /**
     * @throws InvalidArgumentException
     */
    public function distance(array $a, array $b): float
    {
        if (count($a) !== count($b)) {
            throw new InvalidArgumentException('Size of given arrays does not match');
        }

        return array_sum(array_map(function ($m, $n) {
            return abs($m - $n);
        }, $a, $b));
    }
}
